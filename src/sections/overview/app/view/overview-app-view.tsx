'use client';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import InterestsIcon from '@mui/icons-material/Interests';
import { useTheme } from '@mui/material/styles';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// _mock
import { _appFeatured, _appAuthors } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
//
import CalendarViewHome from 'src/sections/calendar/view/calendar-home';
import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppTopAuthors from '../app-top-authors';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const Theme = useTheme()

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <AppWelcome
            title={`Bienvenid@ 👋 \n ${user?.displayName}`}
            description="If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything."
            img={<SeoIllustration />}
            action={
              <Button variant="contained" color="primary">
                Go Now
              </Button>
            }
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Likes"
            percent={2.6}
            total={18765}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            icon={<FavoriteBorderIcon />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Comments"
            percent={0.2}
            total={4876}
            chart={{
              colors: [Theme.palette.info.light, Theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            icon={<ChatIcon />}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Engagement"
            percent={-0.1}
            total={678}
            chart={{
              colors: [Theme.palette.warning.light, Theme.palette.warning.main],
              series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
            }}
            icon={<InterestsIcon />}
          />
        </Grid>

        <Grid xs={12} lg={4}>
          <AppCurrentDownload
            title="Participación por red social"
            chart={{
              series: [
                { label: 'Positivo', value: 12244 },
                { label: 'Neutral', value: 53345 },
                { label: 'Negativo', value: 78343 },
                { label: 'iOS', value: 44313 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Cambio del sentimiento en el tiempo por red social"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2019',
                  data: [
                    {
                      name: 'Asia',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'America',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2020',
                  data: [
                    {
                      name: 'Asia',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'America',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} lg={12}>
          <CalendarViewHome />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AppTopAuthors title="Top Authors" list={_appAuthors} />
        </Grid>
      </Grid>
    </Container>
  );
}
