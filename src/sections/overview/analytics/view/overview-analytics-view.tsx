'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Image from 'next/image';

// components
import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'src/components/settings';
//
import { _analyticOrderTimeline, _analyticTraffic, _ecommerceNewProducts } from 'src/_mock';
import { Card, Divider } from '@mui/material';
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
import BestPostingHours from '../best-posting-hours';
import EcommerceWidgetSummary from '../averages-carrousel';
import YearlySales from '../yearly-sale';
import BookingTotalIncomes from '../../booking/booking-total-incomes';
import BankingBalanceStatistics from '../../banking/banking-balance-statistics';
import AnalyticsCurrent from '../AnaliticsCurrents';
import AnaliticsSenti from '../AnaliticsSenti';
import BookingCheckInWidgets from '../../booking/booking-check-in-widgets';
import AnalyticsTrafficBySite from '../AnaliticsTrafficBySite';

// ----------------------------------------------------------------------

export default function OverviewAnalyticsViewFB() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  function generateRandomData(length: number) {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  }

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
            chart={{
              colors: [theme.palette.primary.light, theme.palette.primary.main],
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
                  year: 'Mes',
                  data: [
                    { name: 'Me Gusta', data: generateRandomData(5) },
                    { name: 'Comentarios', data: generateRandomData(5) },
                    { name: 'Compartidas', data: generateRandomData(5) },
                  ],
                },
                {
                  year: 'Semana',
                  data: [
                    { name: 'Me Gusta', data: generateRandomData(5) },
                    { name: 'Comentarios', data: generateRandomData(5) },
                    { name: 'Compartidas', data: generateRandomData(5) },
                  ],
                },
                {
                  year: 'Dia',
                  data: [
                    { name: 'Me Gusta', data: generateRandomData(5) },
                    { name: 'Comentarios', data: generateRandomData(5) },
                    { name: 'Compartidas', data: generateRandomData(5) },
                  ],
                },
                {
                  year: 'Año',
                  data: [
                    { name: 'Me Gusta', data: generateRandomData(5) },
                    { name: 'Comentarios', data: generateRandomData(5) },
                    { name: 'Compartidas', data: generateRandomData(5) },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={3}>
            <BookingTotalIncomes
              title="Total Incomes"
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
              title="Total Incomes"
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
          <BankingBalanceStatistics
            title="Emoción Por Hora"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.success.main,
                theme.palette.background.purpel.main,
                theme.palette.primary.light,
              ],
              series: [
                {
                  type: 'Mañana',
                  data: [
                    {
                      name: 'Felicidad',
                      data: [10, 41, 35, 151, 49, 62, 69],
                    },
                    {
                      name: 'Tristeza',
                      data: [10, 20, 13, 55, 45, 15, 12],
                    },
                    {
                      name: 'Enojo',
                      data: [8, 52, 32, 25, 47, 58, 19],
                    },
                    {
                      name: 'Disgusto',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                    {
                      name: 'Miedo',
                      data: [10, 54, 13, 16, 77, 28, 99],
                    },
                    {
                      name: 'sorpresa',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                  ],
                },
                {
                  type: 'Tarde',
                  data: [
                    {
                      name: 'Felicidad',
                      data: [10, 41, 35, 151, 49, 62, 69],
                    },
                    {
                      name: 'Tristeza',
                      data: [10, 20, 13, 55, 45, 15, 12],
                    },
                    {
                      name: 'Enojo',
                      data: [8, 52, 32, 25, 47, 58, 19],
                    },
                    {
                      name: 'Disgusto',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                    {
                      name: 'Miedo',
                      data: [10, 54, 13, 16, 77, 28, 99],
                    },
                    {
                      name: 'sorpresa',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                  ],
                },
                {
                  type: 'Noche',
                  data: [
                    {
                      name: 'Felicidad',
                      data: [10, 41, 35, 151, 49, 62, 69],
                    },
                    {
                      name: 'Tristeza',
                      data: [10, 20, 13, 55, 45, 15, 12],
                    },
                    {
                      name: 'Enojo',
                      data: [8, 52, 32, 25, 47, 58, 19],
                    },
                    {
                      name: 'Disgusto',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                    {
                      name: 'Miedo',
                      data: [10, 54, 13, 16, 77, 28, 99],
                    },
                    {
                      name: 'sorpresa',
                      data: [10, 34, 13, 56, 77, 88, 99],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <AnalyticsCurrent
            title="Análisis de Emoción"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.error.main,
                theme.palette.success.main,
                theme.palette.background.purpel.main,
                theme.palette.primary.light,
              ],
              series: [
                { label: 'Felicidad', value: 4344 },
                { label: 'Tristeza', value: 5435 },
                { label: 'Enojo', value: 1443 },
                { label: 'Disgusto', value: 4443 },
                { label: 'Miedo', value: 5435 },
                { label: 'Sorpresa', value: 1443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={8}>
          <AnaliticsSenti
            title="Sentimiento"
            chart={{
              labels: {
                Dia: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
                Hora: [
                  '05:00',
                  '06:00',
                  '07:00',
                  '08:00',
                  '09:00',
                  '10:00',
                  '11:00',
                  '12:00',
                  '13:00',
                  '14:00',
                  '15:00',
                  '16:00',
                ],
              },
              colors: [theme.palette.info.main, theme.palette.error.main],
              series: [
                {
                  type: 'Dia',
                  data: [
                    { name: 'Positivo', data: [20, 34, 48, 65, 37, 48, 28] },
                    { name: 'Negativo', data: [10, 34, 13, 26, 27, 28, 15] },
                  ],
                },
                {
                  type: 'Hora',
                  data: [
                    {
                      name: 'Positivo',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                    },
                    {
                      name: 'Negativo',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12}>
          <Card>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              divider={
                <Divider
                  orientation={smUp ? 'vertical' : 'horizontal'}
                  flexItem
                  sx={{ borderStyle: 'dashed' }}
                />
              }
            >
              asd
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline
            title="Top Hashtags"
            list={[
              {
                title: '#YOLO',
                subtitle: 'Sentimiento: [Sentimiento]',
              },
              {
                title: '12 Invoices have been paid',
                subtitle: 'Sentimiento: [Sentimiento]',
              },
              {
                title: 'Order #37745 from September',
                subtitle: 'Sentimiento: [Sentimiento]',
              },
              {
                title: 'New order placed #XF-2356',
                subtitle: 'Sentimiento: [Sentimiento]',
              },
              {
                title: 'New order placed #XF-2356',
                subtitle: 'Sentimiento: [Sentimiento]',
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsTrafficBySite title="Traffic by Site" list={_analyticTraffic} />
        </Grid>
      </Grid>
    </Container>
  );
}
