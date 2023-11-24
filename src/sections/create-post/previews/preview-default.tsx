import {
  Avatar,
  Box,
  Card,
  Grid,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useAuthContext } from 'src/auth/hooks';
import { useLocales } from 'src/locales';
import ImageMUI from 'src/components/image/image';

interface CardPostProps {
  image: string;
  sx?: SxProps<Theme> | undefined;
}

export default function PreviewDefault({ image, sx }: CardPostProps) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { t } = useLocales();

  return (
    <Card
      sx={{
        borderRadius: '8px',
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        boxShadow: '0px 0.5px 0.5px rgba(0, 0, 0, 0.25)',
        mb: 2,
        ...sx,
      }}
    >
      <Stack
        spacing={2}
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        width="100%"
        sx={{ textAlign: 'center', p: '11px' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Avatar
              src={user?.photoURL}
              alt={user?.displayName}
              variant="square"
              sx={{
                width: 25,
                height: 25,
                borderRadius: '2.5px',
              }}
            />
          </Grid>
          <Grid item xs={10}>
            <Stack spacing={1} width="100%">
              <Box
                sx={{
                  backgroundColor: theme.palette.background.neutral,
                  height: '9px',
                  width: '100%',
                  borderRadius: '12px',
                }}
              />
              <Box
                sx={{
                  backgroundColor: theme.palette.background.neutral,
                  height: '9px',
                  width: '70%',
                  borderRadius: '12px',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Stack>
      <Box sx={{ p: '4px 10px' }}>
        <Typography sx={{ fontSize: '70%', textAlign: 'initial' }}>
          {t('Dashboard.Create_Post.Create.card.text')}
        </Typography>
        <Typography
          sx={{
            fontSize: '70%',
            textAlign: 'initial',
            color: theme.palette.background.purpel.main,
          }}
        >
          {t('Dashboard.Create_Post.Create.card.link')}
        </Typography>
      </Box>
      <ImageMUI src={image} alt="icon" width="100%" />
      <Stack spacing={1} width="100%" sx={{ p: '11px' }} direction="row">
        {[0, 1, 2].map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: theme.palette.background.neutral,
              height: '9px',
              width: '100%',
              borderRadius: '12px',
            }}
          />
        ))}
      </Stack>
    </Card>
  );
}
