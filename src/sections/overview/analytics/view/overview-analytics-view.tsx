'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// components
import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'src/components/settings';
//
import { _analyticOrderTimeline, _analyticTraffic, _ecommerceNewProducts } from 'src/_mock';
import { Card, CardContent, Divider, Typography } from '@mui/material';
import { useResponsive } from 'src/hooks/use-responsive';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useAuthContext } from 'src/auth/hooks';
import { useMockedUser } from 'src/hooks/use-mocked-user';
// import EcommerceWidgetSummary from '../../e-commerce/ecommerce-widget-summary';
import AnalyticsSentimentAnalysis from '../analytics-sentiment-analysis';
import AnalyticsOrderTimeline from '../analytics-order-timeline';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
import EngagementPerPost from '../engagement-perpost';
import HottestTrends from '../hottest-trends';
import ActivityPerHour from '../activity-per-hour';
import BannerOneKpi from '../banner-one-kpi';
import GaugeEng from '../gauge-engagement';
import GainedFollowers from '../gained-followers';
import cameraIcon from '../../../../../public/assets/icons/analyticsPage/camera.png';
import penIcon from '../../../../../public/assets/icons/analyticsPage/pen.png';
import phoneIcon from '../../../../../public/assets/icons/analyticsPage/phone.png';
import videoIcon from '../../../../../public/assets/icons/analyticsPage/video.png';
import WordCloud from '../word-cloud';
import EcommerceWidgetSummary from '../averages-carrousel';
import YearlySales from '../yearly-sale';
import BookingTotalIncomes from '../../booking/booking-total-incomes';
import BankingBalanceStatistics from '../../banking/banking-balance-statistics';
import AnalyticsCurrent from '../AnaliticsCurrents';
import AnaliticsSenti from '../AnaliticsSenti';
import BookingCheckInWidgets from '../../booking/booking-check-in-widgets';
import AnalyticsTrafficBySite from '../AnaliticsTrafficBySite';
import useChartsData from './AnaliticsData';
import { primaryFont } from '../../../../theme/typography';
import BestPostingHours from '../BestPostingHours';
import TopWords from '../TopWords';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsViewFB() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const { yearlySalesData, EmotionPerHora, EmotionAnalysis, Feeling, TopHashtags } =
    useChartsData();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={user?.name ? `Facebook: ${user.name}` : 'Facebook'}
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Facebook' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Product Sold"
            percent={2.6}
            total={765}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Total Balance"
            percent={-0.1}
            total={18765}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Sales Profit"
            percent={0.6}
            total={4876}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
            }}
          />
        </Grid>

        <Grid xs={12} sm={12} md={6}>
          <BannerOneKpi title="Nuevos Seguidores" total="+245" color="success" />
        </Grid>

        <Grid xs={12} sm={12} md={6}>
          <BannerOneKpi title="Menciones" total="45" />
        </Grid>

        <Grid xs={12} md={8}>
          <YearlySales
            title="Yearly Sales"
            subheader="(+43%) than last year"
            chart={yearlySalesData}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <BookingTotalIncomes
              title="Seguidores Totales"
              total={18765}
              percent={2.6}
              chart={{
                series: [
                  { x: 2016, y: 111 },
                  { x: 2017, y: 136 },
                  { x: 2018, y: 76 },
                  { x: 2019, y: 108 },
                  { x: 2020, y: 74 },
                  { x: 2021, y: 54 },
                  { x: 2022, y: 57 },
                  { x: 2023, y: 84 },
                ],
              }}
            />
            <BookingTotalIncomes
              color="info"
              title="Engagement"
              total={18765}
              percent={2.6}
              chart={{
                series: [
                  { x: 2016, y: 111 },
                  { x: 2017, y: 136 },
                  { x: 2018, y: 76 },
                  { x: 2019, y: 108 },
                  { x: 2020, y: 74 },
                  { x: 2021, y: 54 },
                  { x: 2022, y: 57 },
                  { x: 2023, y: 84 },
                ],
              }}
            />
          </Stack>
        </Grid>

        <Grid xs={12}>
          <BankingBalanceStatistics title="Emoción Por Hora" chart={EmotionPerHora} />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrent title="Análisis de Emoción" chart={EmotionAnalysis} />
        </Grid>

        <Grid xs={12} md={8}>
          <AnaliticsSenti title="Sentimiento" chart={Feeling} />
        </Grid>
        <Grid xs={12}>
          <BestPostingHours />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline title="Top Hashtags" list={TopHashtags} />
        </Grid>
        <Grid xs={12} md={8}>
          <TopWords />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Engagement Por Tipo De Post" list={_analyticTraffic} />
        </Grid>
      </Grid>
    </Container>
  );
}
