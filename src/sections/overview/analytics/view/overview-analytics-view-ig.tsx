'use client';

import { useMemo } from 'react';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// _mock
import { IconContext } from 'react-icons';
import { CgInstagram } from 'react-icons/cg';
 import {
  _analyticTasks,
   _analyticPosts,
//   _analyticTraffic,
//   _analyticOrderTimeline,
 } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useMockedUser } from 'src/hooks/use-mocked-user';
import AnalyticsNews from '../analytics-news';
import AnalyticsTasks from '../analytics-tasks';
import AnalyticsCurrentVisits from '../analytics-sentiment-analysis';
import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsCurrentSubject from '../analytics-current-subject';
import AnalyticsConversionRates from '../analytics-conversion-rates';
import LikeIcon from '../../../../../public/assets/icons/kpiCards/LikeIcon';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsViewIG() {
  const settings = useSettingsContext();
  const { userSocials } = useMockedUser();

  const iconContextValue = useMemo(() => ({ color: 'FFFFFF', className: 'global-class-name' }), []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Analytics"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Analytics', href: paths.dashboard.analytics.root },
          { name: 'Instagram' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={4}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 3, md: 5 },
              textAlign: 'left',
              m: 2,
              p: 0,
            }}
          >
            <h1 style={{ margin: 0, padding: 0 }}>{userSocials?.facebookUserName}</h1>
          </Typography>
        </div>
      </Grid>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: '#0668E1',
            borderRadius: '12px',
            padding: '1rem',
          }}
        >
          <IconContext.Provider value={iconContextValue}>
            <CgInstagram />
          </IconContext.Provider>
        </Box>
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Weekly Sales" total={714000} icon={LikeIcon} />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="New Users" total={1352831} color="info" icon={LikeIcon} />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={LikeIcon}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary title="Bug Reports" total={234} color="error" icon={LikeIcon} />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid> */}

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsNews title="News" list={_analyticPosts} />
        </Grid>
        {/* 
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Order Timeline" list={_analyticOrderTimeline} />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
        </Grid> */}

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsTasks title="Tasks" list={_analyticTasks} />
        </Grid>
      </Grid>
    </Container>
  );
}
