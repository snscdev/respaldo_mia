// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// types
// components
import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import { IPostFilters, PostFilterValue } from 'src/types/post';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IPostFilters;
  onFilters: (name: string, value: PostFilterValue) => void;
  //
  canReset: boolean;
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function PostFiltersResult({
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);
  const { t } = useLocales();

  // const handleRemoveServices = (inputValue: string) => {
  //   const newValue = filters.services.filter((item) => item !== inputValue);
  //   onFilters('services', newValue);
  // };

  const handleRemoveAvailable = () => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  };

  // const handleRemoveTourGuide = (inputValue: ITourGuide) => {
  //   const newValue = filters.tourGuides.filter((item) => item.name !== inputValue.name);
  //   onFilters('tourGuides', newValue);
  // };

  // const handleRemoveDestination = (inputValue: string) => {
  //   const newValue = filters.destination.filter((item) => item !== inputValue);
  //   onFilters('destination', newValue);
  // };

  const handleRemoveSocialNetworks = (inputValue: string) => {
    const newValue = filters.socialNetworks.filter((item) => item !== inputValue);
    onFilters('socialNetworks', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {/* {filters.startDate && filters.endDate && (
          <Block label="Available:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveAvailable} />
          </Block>
        )} */}
        {/* 
        {!!filters.services.length && (
          <Block label="Services:">
            {filters.services.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveServices(item)}
              />
            ))}
          </Block>
        )} */}
        {/* 
        {!!filters.tourGuides.length && (
          <Block label="Tour guide:">
            {filters.tourGuides.map((item) => (
              <Chip
                key={item.id}
                size="small"
                avatar={<Avatar alt={item.name} src={item.avatarUrl} />}
                label={item.name}
                onDelete={() => handleRemoveTourGuide(item)}
              />
            ))}
          </Block>
        )} */}
        {/* 
        {!!filters.destination.length && (
          <Block label="Destination:">
            {filters.destination.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveDestination(item)}
              />
            ))}
          </Block>
        )} */}

        {!!filters.socialNetworks.length && (
          <Block label={t('Dashboard.Create_Post.Create.filters.socialNetworks')}>
            {filters.socialNetworks.map((item) => (
              <Chip
                key={item}
                label={item}
                color="info"
                variant="soft"
                size="small"
                onDelete={() => handleRemoveSocialNetworks(item)}
              />
            ))}
          </Block>
        )}

        {filters.startDate && filters.endDate && (
          <Block label="Fecha:">
            <Chip
              size="small"
              color="info"
              variant="soft"
              label={shortLabel}
              onDelete={handleRemoveAvailable}
            />
          </Block>
        )}

        {canReset && (
          <Button
            color="error"
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            {t('Dashboard.Create_Post.Create.filters.clear')}
          </Button>
        )}
        {/* <Box sx={{ typography: 'body2' }}>
          <strong>{results}</strong>
          <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
            results found
          </Box>
        </Box> */}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
