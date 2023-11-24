/* eslint-disable */
import * as Yup from 'yup';
import { useCallback, useMemo, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import LoadingButton from '@mui/lab/LoadingButton';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TimePicker } from '@mui/x-date-pickers';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
// _mock
import { _tags } from 'src/_mock';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from 'src/components/hook-form';
// types
import { IPeople } from 'src/types/tour';
import { IPostDetails } from 'src/types/postDetails';
import { mockTourItem, mockPeople } from 'src/_mock/mockData';

// APIs
import { schedulePost } from 'src/api/schedule-post';

// ----------------------------------------------------------------------

export default function TourNewEditForm({ defaultData }: any) {

  // const [setOpen] = React.useState(true);

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();


  const NewTourSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    content: Yup.string().required('Content is required'),
    images: Yup.array().min(1, 'Images is required'),
    socials: Yup.array()
      .of(Yup.string())
      .min(1, 'Must select at least 1 social media platform'),
    tags: Yup.array().min(1, 'Must have at least 1 guide').test(
      'tag-check',
      'Tags should pull from user socials',
      (value) => value && value.some(tag => tag.includes(tag))
    ),
    people: Yup.array().min(2, 'Must have at least 2 tags'),
    destination: Yup.string().required('Destination is required'),
    available: Yup.object().shape({
      startDate: Yup.date().required('Start date is required'),
      startTime: Yup.date().required('Start time is required'),
    }),
  });


  const [currentTourItem] = useState(mockTourItem);


  const defaultValues = useMemo(
    () => ({
      name: currentTourItem?.name || '',
      content: currentTourItem?.content || '',
      images: currentTourItem?.images || [],
      socials: currentTourItem?.socials
        ? Object.keys(currentTourItem?.socials).filter(key => {
          if (currentTourItem?.socials){
            return currentTourItem.socials[key] != null
        }})
        : [],
      people: currentTourItem?.people || [],
      tags: currentTourItem?.tags || [],
      destination: currentTourItem?.destination || '',
      available: {
        startDate: currentTourItem?.available?.startDate || new Date(),
        startTime: currentTourItem?.available?.startTime || new Date(),
      },
    }),
    [currentTourItem, mockTourItem ]
  );


  const methods = useForm({
    resolver: yupResolver(NewTourSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentTourItem && defaultValues) {
      reset(defaultValues);
    }
  }, [currentTourItem, defaultValues, reset]);


  const onSubmit = handleSubmit(async (data) => {
    console.log('Button clicked');
    try {
      // Simulate a delay (if needed)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Extract date from form data
      const date = new Date(data.available.startDate);

      // If startTime is a Date object, do this:
      const hour = data.available.startTime.getHours();
      const minute = data.available.startTime.getMinutes();
      const second = data.available.startTime.getSeconds();

      // Combine date and time into a JavaScript Date object
      date.setHours(hour, minute, second);

      // Convert to ISO string and then to the required "YYYY-MM-DDThh:mm:ssZ" format
      const utcDateTimeStr = `${date.toISOString().split('.')[0]}Z`;

      // Extract relevant data from the form submission
      const postDetails: IPostDetails = {
        post: data.content,
        platforms: data.socials,
        mediaUrls: data.images,
        scheduleDate: utcDateTimeStr
      };
      // Call backend API to schedule the post
      const response = await schedulePost(postDetails);
      console.log('Called API', response);

      if (response && response.status === 'success') {
        enqueueSnackbar('Post scheduled successfully!');
      } else {
        enqueueSnackbar('Failed to schedule post');
      }

      // Your existing logic
      reset();
      enqueueSnackbar(currentTourItem ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.tour.calendar);

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('An error occurred');
    }
  });


  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  // const debugPrefillData = (socials: any) => {
  //   return Object.keys(socials).filter(key => socials[key] !== null);
  // };


  // const handleModalClose = (value: any) => {
  //   setOpen(false);
  // };

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Detalles
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Título, breve descripcción, imágen...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Detalles" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Plataformas</Typography>
              <RHFMultiCheckbox
                name="socials"
                options={[
                  { label: 'Facebook', value: 'facebook' },
                  { label: 'Twitter', value: 'twitter' },
                  { label: 'Instagram', value: 'instagram' },
                  { label: 'LinkedIn', value: 'linkedin' },
                  { label: 'Threads', value: 'threads' },
                ]}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                }}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Título</Typography>
              <RHFTextField name="name" placeholder="Ex: Plática en Palacio Nacional..." />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Contenido</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Imágenes</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack>
              <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                Etiquetados
              </Typography>

              <RHFAutocomplete
                multiple
                name="people"
                placeholder="+ Personas"
                disableCloseOnSelect
                options={mockPeople.map((option) => option as IPeople)}
                getOptionLabel={(option) => (option as IPeople).name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, tourGuide) => (
                  <li {...props} key={tourGuide.id}>
                    <Avatar
                      key={tourGuide.id}
                      alt={tourGuide.avatarUrl}
                      src={tourGuide.avatarUrl}
                      sx={{ width: 24, height: 24, flexShrink: 0, mr: 1 }}
                    />

                    {tourGuide.name}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((tourGuide, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={tourGuide.id}
                      size="small"
                      variant="soft"
                      label={tourGuide.name}
                      avatar={<Avatar alt={tourGuide.name} src={tourGuide.avatarUrl} />}
                    />
                  ))
                }
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Schedule</Typography>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <Controller
                  name="available.startDate"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DatePicker
                      {...field}
                      format="dd/MM/yyyy"
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />
                <Controller
                  name="available.startTime"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <TimePicker
                      {...field}
                      ampm={false}
                      openTo="hours"
                      views={['hours', 'minutes', 'seconds']}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                        },
                      }}
                    />
                  )}
                />

              </Stack>
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Tags</Typography>
              <RHFAutocomplete
                name="tags"
                placeholder="+ Tags"
                multiple
                freeSolo
                options={_tags.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton
          onClick={() => console.log('Button clicked')}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!defaultData ? 'Create Post' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}
        {renderProperties}
        {renderActions}
      </Grid>
    </FormProvider>
  );
}

