'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import { useCallback, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { IconButton, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material';
import Container from '@mui/material/Container';
import Image from 'src/components/image';

// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useBoolean } from 'src/hooks/use-boolean';

import { SOCIALNETWORKS } from 'src/const/post/redes';
// types
import { IPostFilters, IPostItem, PostFilterValue } from 'src/types/post';
import EmptyContent from 'src/components/empty-content/empty-content';
import { fTimestamp } from 'src/utils/format-time';
//
import { useLocales } from 'src/locales';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import CreatePostMessage from './create-post-message';
import CreatePostBtns from './create-post-btn';
import PostList from '../create-post-list';
import PostSearch from '../post-search';
import PostFilters from '../post-filters';
import PostFiltersResult from '../post-filters-result';
import PostModal from '../post-modal';

const Icons = SOCIALNETWORKS.map((item) => ({
  name: item.name,
  href: '#',
}));

const mockState = ['published', 'programmed', 'published', 'programmed', 'published'];

const redes = [1];
const posts: IPostItem[] = SOCIALNETWORKS.map((item, index) => ({
  id: index.toString(),
  socialName: item.name,
  image: '',
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
  title: `Post ${index + 1}`,
  state: mockState[index],
  date: new Date(),
}));

const defaultFilters: IPostFilters = {
  socialNetworks: [],
  startDate: null,
  endDate: null,
  state: 'published',
};

export default function CreatePostHome() {
  const settings = useSettingsContext();

  const Theme = useTheme();

  const { t } = useLocales();

  const openFilters = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  const [selectedTab, setSelectedTab] = useState(0);

  const canReset = !!filters.socialNetworks.length || (!!filters.startDate && !!filters.endDate);

  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: posts,
    filters,
    dateError,
  });

  const handleFilters = useCallback((name: string, value: PostFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const mdUp = useResponsive('up', 'md');

  const [search, setSearch] = useState<{ query: string; results: any[] }>({
    query: '',
    results: [],
  });

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleSearch = useCallback(
    (inputValue: string) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = posts.filter(
          (post) => post.title?.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <PostSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id: string) => paths.dashboard.tour.details(id)}
      />
      <Stack direction="row" spacing={1} flexShrink={0}>
        <PostFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          socialNetworks={SOCIALNETWORKS}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          dateError={dateError}
        />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <PostFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  const ConnectSocialNetworks = (
    <Paper sx={{ p: 3, mt: 3, backgroundColor: Theme.palette.background.paper }} elevation={2}>
      <Stack
        spacing={1}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        sx={{ textAlign: 'center' }}
      >
        <Typography variant="h6">{t('Dashboard.Create_Post.Social_Networks.Title')}</Typography>
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
          {Icons.map((item, index) => (
            <IconButton key={index}>
              <Image src={`/assets/icons/dashboard/post/${item.name}.svg`} alt="image" />
            </IconButton>
          ))}
        </Stack>
        <Typography variant="body1" sx={{ maxWidth: '500px' }}>
          {t('Dashboard.Create_Post.Social_Networks.text')}
        </Typography>

        <Button
          component={RouterLink}
          href={paths.dashboard.tour.new}
          variant="contained"
          color="info"
          sx={{ mt: 2, minHeight: '50px' }}
        >
          {t('Dashboard.Create_Post.Social_Networks.btn')}
        </Button>
      </Stack>
    </Paper>
  );

  const handleClickTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);

    if (newValue === 0) {
      handleFilters('state', 'published');
    }

    if (newValue === 1) {
      handleFilters('state', 'programmed');
    }
  };

  const renderTabs = (
    <Tabs
      value={selectedTab}
      onChange={handleClickTab}
      sx={{
        '& .MuiTabs-indicator': {
          backgroundColor: 'info.main',
        },
        '& .MuiTab-root': {
          color: 'text.secondary',
        },
        '& .Mui-selected': {
          color: 'info.main',
        },
      }}
    >
      <Tab label={t('Dashboard.Create_Post.Create.filters.Published')} />
      <Tab label={t('Dashboard.Create_Post.Create.filters.programmed')} />
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('Dashboard.Create_Post.Title')}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: t('Dashboard.Create_Post.Title') },
        ]}
        action={mdUp ? <CreatePostBtns /> : null}
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
        {renderTabs}
        {canReset && renderResults}

        {!mdUp ? <CreatePostBtns /> : null}
      </Stack>

      {redes.length ? (
        posts.length ? (
          dataFiltered.length ? (
            <PostList posts={dataFiltered} />
          ) : (
            <EmptyContent title="No Data" filled sx={{ py: 10 }} />
          )
        ) : (
          <CreatePostMessage />
        )
      ) : (
        ConnectSocialNetworks
      )}
      <PostModal />
    </Container>
  );
}

const applyFilter = ({
  inputData,
  filters,
  dateError,
}: {
  inputData: IPostItem[];
  filters: IPostFilters;
  dateError: boolean;
}) => {
  const { socialNetworks, startDate, endDate, state } = filters;

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (post) =>
          fTimestamp(post?.date) >= fTimestamp(startDate) &&
          fTimestamp(post?.date) <= fTimestamp(endDate)
      );
    }
  }

  if (socialNetworks.length) {
    inputData = inputData.filter((post) => socialNetworks?.includes(post?.socialName as string));
  }

  if (state) {
    inputData = inputData.filter((post) => post?.state === state);
  }

  return inputData;
};
