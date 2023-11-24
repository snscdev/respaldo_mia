import { Box, Button, Stack } from '@mui/material';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { setOpenModal } from 'src/store/slices/post';

export default function CreatePostBtns() {
  const { t } = useLocales();

  const dispatch = useDispatch();
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button
          component={RouterLink}
          href={paths.dashboard.root}
          variant="contained"
          startIcon={
            <Image src="/assets/icons/navbar/ic_magicpen.svg" width={24} height={24} alt="icon" />
          }
          sx={{
            '&.MuiButton-root': {
              background: 'linear-gradient(90deg, #A300DC 0%, #DC0073 100%)',
              height: '48px',
              color: '#fff',
              fontSize: { xs: '12px', md: '16px' },
            },
          }}
        >
          {t('Dashboard.Create_Post.btn_IA')}
        </Button>

        <Button onClick={() => dispatch(setOpenModal(true))} variant="contained" color="primary">
          {t('Dashboard.Create_Post.btn_CreateNew')}
        </Button>
      </Stack>
    </Box>
  );
}
