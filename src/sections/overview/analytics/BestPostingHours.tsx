import { Card, Divider, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';

export default function BestPostingHours() {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  return (
    <Card>
      <Box
        sx={{
          padding: '10px',
        }}
      >
        <Stack
          direction={{ sm: 'column', md: 'row' }}
          gap={4}
          alignItems="center"
          justifyItems="center"
          justifyContent="center"
          divider={
            <Divider
              orientation={smUp ? 'vertical' : 'horizontal'}
              flexItem
              sx={{ borderStyle: 'dashed' }}
            />
          }
        >
          <Stack
            direction={{ sm: 'column', md: 'row' }}
            spacing={2}
            alignItems="center"
            justifyItems="center"
            justifyContent="center"
            width={{
              sm: '100%',
              md: '33%',
            }}
          >
            <Typography
              sx={{
                mb: 1,
                maxWidth: { sm: '100%', md: '171px' },
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              Mejores Horas de Publicación
            </Typography>
            <Stack direction="row" spacing={2}>
              <Image src="/assets/icons/dashboard/analytics/one.svg" alt="camera" />
              <Stack spacing={0} justifyContent="center">
                <Typography
                  sx={{
                    fontSize: '16px',
                  }}
                >
                  Post At
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    color: theme.palette.background.purpel.main,
                    fontWeight: 700,
                  }}
                >
                  12:09
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width={{
              sm: '100%',
              md: '33%',
            }}
            spacing={2}
          >
            <Image src="/assets/icons/dashboard/analytics/two.svg" alt="camera" />
            <Stack spacing={0} justifyContent="center">
              <Typography
                sx={{
                  fontSize: '16px',
                }}
              >
                Post At
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                }}
              >
                12:09
              </Typography>
            </Stack>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width={{
              sm: '100%',
              md: '33%',
            }}
            spacing={2}
          >
            <Image src="/assets/icons/dashboard/analytics/three.svg" alt="camera" />
            <Stack spacing={0} justifyContent="center">
              <Typography
                sx={{
                  fontSize: '16px',
                }}
              >
                Post At
              </Typography>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: theme.palette.info.main,
                  fontWeight: 700,
                }}
              >
                12:09
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
}
