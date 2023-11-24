'use client';

import Image from 'next/image';
import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fTimestamp } from 'src/utils/format-time';
// _mock
import { _tours } from 'src/_mock';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// types
import { ITourItem, ITourFilters } from 'src/types/tour';
//
import { useLocales } from 'src/locales';
import TourList from '../tour-list';
import TourSearch from '../tour-search';

// ----------------------------------------------------------------------

const defaultFilters: ITourFilters = {
  destination: [],
  tourGuides: [],
  services: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function TourListView() {
  const settings = useSettingsContext();

  const { t } = useLocales();

  const [sortBy] = useState('latest');

  const [search, setSearch] = useState<{ query: string; results: ITourItem[] }>({
    query: '',
    results: [],
  });

  const [filters] = useState(defaultFilters);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: _tours,
    filters,
    sortBy,
    dateError,
  });

  // const canReset =
  //   !!filters.destination.length ||
  //   !!filters.tourGuides.length ||
  //   !!filters.services.length ||
  //   (!!filters.startDate && !!filters.endDate);

  // const notFound = !dataFiltered.length && canReset;

  // const handleFilters = useCallback((name: string, value: ITourFilterValue) => {
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }, []);

  //  const handleSortBy  = useCallback((newValue: string) => {
  //     setSortBy(newValue);
  //   }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = _tours.filter(
          (tour) => tour.name.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <TourSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.tour.details(id)}
      />

      {/* <Stack direction="row" spacing={1} flexShrink={0}>
        <TourFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          serviceOptions={TOUR_SERVICE_OPTIONS.map((option) => option.label)}
          tourGuideOptions={_tourGuides}
          destinationOptions={countries}
          //
          dateError={dateError}
        />

        <TourSort sort={sortBy} onSort={handleSortBy} sortOptions={TOUR_SORT_OPTIONS} />
      </Stack> */}
    </Stack>
  );

  // const renderResults = (
  //   <TourFiltersResult
  //     filters={filters}
  //     onResetFilters={handleResetFilters}
  //     //
  //     canReset={canReset}
  //     onFilters={handleFilters}
  //     //
  //     results={dataFiltered.length}
  //   />
  // );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('Dashboard.Create_Post.Title')}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: t('Dashboard.Create_Post.Title') },
        ]}
        action={
          <>
            <Button
              component={RouterLink}
              href={paths.dashboard.tour.new}
              variant="contained"
              startIcon={
                <Image
                  src="/assets/icons/create-post/magicpen.svg"
                  width={24}
                  height={24}
                  alt="icon"
                />
              }
              sx={{
                right: '19px',
                backgroundColor: 'linear-gradient(90deg, #A300DC 0%, #DC0073 100%)',
              }}
            >
              {t('Dashboard.Create_Post.btn_IA')}
            </Button>

            <Button component={RouterLink} href={paths.dashboard.tour.new} variant="contained">
              {t('Dashboard.Create_Post.btn_CreateNew')}
            </Button>
          </>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {/* {canReset && renderResults} */}
      </Stack>

      {/* {notFound && <EmptyContent title="No Data" filled sx={{ py: 10 }} />} */}

      <TourList tours={dataFiltered} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({
  inputData,
  filters,
  sortBy,
  dateError,
}: {
  inputData: ITourItem[];
  filters: ITourFilters;
  sortBy: string;
  dateError: boolean;
}) => {
  const { services, destination, startDate, endDate, tourGuides } = filters;

  const tourGuideIds = tourGuides.map((tourGuide) => tourGuide.id);

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }

  // FILTERS
  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (tour) =>
          fTimestamp(tour?.available?.startDate) >= fTimestamp(startDate) &&
          fTimestamp(tour?.available?.endDate) <= fTimestamp(endDate)
      );
    }
  }

  if (destination.length) {
    inputData = inputData.filter((tour) => destination?.includes(tour?.destination as string));
  }

  if (tourGuideIds.length) {
    inputData = inputData.filter(
      (tour) => tour?.tourGuides?.some((filterItem) => tourGuideIds.includes(filterItem.id))
    );
  }

  if (services.length) {
    inputData = inputData.filter((tour) => tour?.services?.some((item) => services.includes(item)));
  }

  return inputData;
};
