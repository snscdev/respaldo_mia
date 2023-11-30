import { Button, Icon, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import Iconify from 'src/components/iconify';
import { setShowCropSection } from 'src/store/slices/post';

export default function CropSectionLayout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  return (
    <Stack
      sx={{
        padding: '24px 4px 0 0',
        gap: '24px',
      }}
    >
      <Button
        variant="text"
        onClick={() => dispatch(setShowCropSection(false))}
        startIcon={<Iconify icon="solar:alt-arrow-left-outline" width={24} height={24} />}
        sx={{
          width: '100px',
        }}
      >
        Volver
      </Button>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          p: '24px 24px 0 0',
        }}
      >
        Multimedia
      </Typography>
      {children}
    </Stack>
  );
}
