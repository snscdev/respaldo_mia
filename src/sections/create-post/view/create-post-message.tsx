import { Box, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { useLocales } from 'src/locales';
import CreatePostBtns from './create-post-btn';
import PreviewDefault from '../previews/preview-default';

const postexample = [
  {
    Image: '/assets/images/dasboard/post/verify.png',
  },
  {
    Image: '/assets/images/dasboard/post/figma.png',
  },
];

export default function CreatePostMessage() {
  const Theme = useTheme();

  const { t } = useLocales();

  const smUp = useResponsive('up', 'sm');
  return (
    <Box>
      <Grid
        container
        spacing={2}
        component={Paper}
        elevation={2}
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' },
        }}
      >
        <Grid xs={12} sm={4}>
          <Box
            sx={{
              backgroundColor: {
                xs: Theme.palette.background.paper,
                sm: Theme.palette.background.neutral,
              },
              width: '100%',
              height: '100%',
              borderRadius: '8px',
              padding: '8% 10%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {postexample.map((item, index) => (
              <PreviewDefault key={index} image={item.Image} />
            ))}
            {!smUp && (
              <Box sx={{ mt: '48px' }}>
                <CreatePostBtns />
              </Box>
            )}
          </Box>
        </Grid>
        <Grid xs={12} sm={8}>
          <Box
            sx={{
              backgroundColor: Theme.palette.background.paper,
              borderRadius: '8px',
              height: '100%',
              width: '100%',
              p: '8% 10%',
            }}
          >
            <Typography variant="h3" sx={{ mb: '48px' }}>
              {t('Dashboard.Create_Post.Create.Title')}
            </Typography>
            <ul
              style={{
                listStyle: 'none',
                padding: '0px',
                margin: '0px',
              }}
            >
              {[1, 2, 3, 4, 5].map((item, index) => (
                <li key={index}>
                  <Typography
                    variant="h6"
                    color={Theme.palette.text.secondary}
                    sx={{ fontSize: '16px', fontWeight: '500', mb: '16px' }}
                  >
                    {t(`Dashboard.Create_Post.Create.list.item${item}`)}
                  </Typography>
                </li>
              ))}
            </ul>

            {smUp && (
              <Box sx={{ mt: '48px' }}>
                <CreatePostBtns />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
