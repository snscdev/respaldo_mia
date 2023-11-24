'use client';

import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useResponsive } from 'src/hooks/use-responsive';
import { setOpenModalPreviewMobile } from 'src/store/slices/post';

interface IPosModalFormLayout {
  children?: React.ReactNode | React.ReactNode[];
}

export default function PosModalFormLayout({ children }: IPosModalFormLayout) {
  const mdDown = useResponsive('down', 'md');

  const dispatch = useDispatch();

  return (
    <Stack
      sx={{
        padding: '24px 24px 0 0',
        gap: '24px',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Crea un post
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <Typography sx={{ fontWeight: 400, fontSize: 14 }}>Publicar en</Typography>

        <Link
          href="#"
          underline="hover"
          sx={(theme) => ({
            color: theme.palette.info.main,
          })}
        >
          Conectar a otra Red Social
        </Link>
      </Box>

      {children}

      {mdDown && <Button onClick={() => dispatch(setOpenModalPreviewMobile(true))}>Open</Button>}
    </Stack>
  );
}
