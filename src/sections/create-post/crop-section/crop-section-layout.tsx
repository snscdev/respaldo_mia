import { Button, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Iconify from 'src/components/iconify';
import { setDataImageCrop, setDataImageCroped, setShowCropSection } from 'src/store/slices/post';

export default function CropSectionLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const handleBack = () => {
    dispatch(setShowCropSection(false));
    dispatch(setDataImageCrop(''));
    dispatch(setDataImageCroped(''));
  };

  return (
    <Stack
      sx={{
        padding: '24px 4px 0 0',
        gap: '24px',
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Button
        variant="text"
        onClick={handleBack}
        startIcon={<Iconify icon="solar:alt-arrow-left-outline" width={24} height={24} />}
        sx={{
          width: '100px',
          alignSelf: 'flex-start',
        }}
      >
        Volver
      </Button>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          p: '24px 24px 0 0',
          alignSelf: 'flex-start',
        }}
      >
        Multimedia
      </Typography>
      {children}
    </Stack>
  );
}
