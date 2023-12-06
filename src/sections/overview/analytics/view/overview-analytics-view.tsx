'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

// components
import Stack from '@mui/material/Stack';
import { useSettingsContext } from 'src/components/settings';
//
import { _analyticTraffic } from 'src/_mock';
import { SOCIALNETWORKSNAMES } from 'src/const/post/redes';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useAuthContext } from 'src/auth/hooks';
import AnalyticsOrderTimeline from '../analytics-order-timeline';
import BannerOneKpi from '../banner-one-kpi';
import EcommerceWidgetSummary from '../averages-carrousel';
import YearlySales from '../yearly-sale';
import BookingTotalIncomes from '../../booking/booking-total-incomes';
import BankingBalanceStatistics from '../../banking/banking-balance-statistics';
import AnalyticsCurrent from '../AnaliticsCurrents';
import AnaliticsSenti from '../AnaliticsSenti';
import AnalyticsTrafficBySite from '../AnaliticsTrafficBySite';
import useChartsData from './AnaliticsData';
import BestPostingHours from '../BestPostingHours';
import TopWords from '../TopWords';
import SentimentbyTopic from '../sentiment-by-topic';

// ----------------------------------------------------------------------
interface IProps {
  social: string;
}
export default function OverviewAnalyticsViewFB({ social }: IProps) {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const theme = useTheme();

  const { yearlySalesData, EmotionPerHora, EmotionAnalysis, Feeling, TopHashtags } =
    useChartsData();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={
          user?.name
            ? `${social.charAt(0).toUpperCase() + social.slice(1)}: ${user.name}`
            : 'Facebook'
        }
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Facebook' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Me Gusta"
            percent={2.6}
            total={765}
            chart={{
              series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Comentarios"
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
            title="Compartidas"
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
            title="Interacciones"
            subheader="(+43%) más que la semana pasada"
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
              unit="%"
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

        {social === SOCIALNETWORKSNAMES.twitter && (
          <>
            <Grid xs={12} md={6} lg={4}>
              <AnalyticsOrderTimeline
                title="Usuarios Etiquetados que Generan Engagement"
                list={TopHashtags}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <AnalyticsTrafficBySite title="Engagement Por Tipo De Post" list={_analyticTraffic} />
            </Grid>
            <Grid xs={12} md={6}>
              <TopWords />
            </Grid>
            <Grid xs={12} md={6}>
              <SentimentbyTopic />
            </Grid>
          </>
        )}

        {(social === SOCIALNETWORKSNAMES.facebook || social === SOCIALNETWORKSNAMES.instagram) && (
          <>
            <Grid xs={12} md={8}>
              <TopWords />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <AnalyticsTrafficBySite title="Engagement Por Tipo De Post" list={_analyticTraffic} />
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
}
