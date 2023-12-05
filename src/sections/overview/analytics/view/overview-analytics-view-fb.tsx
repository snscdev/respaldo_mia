'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Image from 'next/image';

// components
import { useSettingsContext } from 'src/components/settings';
//
import { _ecommerceNewProducts } from 'src/_mock';
import { paths } from 'src/routes/paths';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
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

// ----------------------------------------------------------------------

export default function OverviewAnalyticsViewFB() {
  const settings = useSettingsContext();
  const { userSocials } = useMockedUser();
  const theme = useTheme();
  const TIME_LABELS = {
    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    hour: [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
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
      '17:00',
      '18:00',
      '19:00',
      '20:00',
      '21:00',
      '22:00',
      '23:00',
      '24:00',
    ],
  };
  // const TIME_LABELSC = {
  //   Week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   Month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   Hour: [
  //     '00:00',
  //     '01:00',
  //     '02:00',
  //     '03:00',
  //     '04:00',
  //     '05:00',
  //     '06:00',
  //     '07:00',
  //     '08:00',
  //     '09:00',
  //     '10:00',
  //     '11:00',
  //     '12:00',
  //     '13:00',
  //     '14:00',
  //     '15:00',
  //     '16:00',
  //     '17:00',
  //     '18:00',
  //     '19:00',
  //     '20:00',
  //     '21:00',
  //     '22:00',
  //     '23:00',
  //     '24:00',
  //   ],
  // };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={
          userSocials?.facebookUserName
            ? `Facebook Analytics: ${userSocials.facebookUserName}`
            : 'Facebook Analytics'
        }
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Analytics', href: paths.dashboard.analytics.root },
          { name: 'Facebook' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={4}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      </Grid>

      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Likes"
            percent={2.6}
            total={17465}
            chart={{
              series: [1678, 2135, 1456, 1890, 2234, 2567, 1987, 2786, 2562, 2986, 2986],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Comentarios"
            percent={-0.1}
            total={8765}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [905, 763, 1000, 1020, 1134, 843, 764, 961, 1234, 1246, 1246],
            }}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceWidgetSummary
            title="Shares"
            percent={0.6}
            total={3876}
            chart={{
              colors: [theme.palette.warning.light, theme.palette.warning.main],
              series: [350, 234, 457, 432, 479, 510, 550, 521, 889, 453, 453],
            }}
          />
        </Grid> */}

        <Grid xs={12} sm={12} md={6}>
          <BannerOneKpi title="Nuevos Seguidores" total="+245" color="success" />
        </Grid>

        <Grid xs={12} sm={12} md={6}>
          <BannerOneKpi title="Menciones" total="45" />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AnalyticsWebsiteVisits
            title="Interacciones"
            subheader="(+1.91%) mes anterior"
            chart={{
              colors: [
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.info.main,
              ],
              labels: {
                Week: TIME_LABELS.week,
                Month: TIME_LABELS.month,
                Hour: TIME_LABELS.hour,
              },
              series: {
                Week: [
                  {
                    name: 'Likes',
                    type: 'area',
                    fill: 'gradient',
                    data: [567, 345, 456, 678, 957, 789, 1456],
                  },
                  {
                    name: 'Comments',
                    type: 'area',
                    fill: 'gradient',
                    data: [267, 145, 356, 178, 457, 589, 656],
                  },
                  {
                    name: 'Shares',
                    type: 'area',
                    fill: 'gradient',
                    data: [67, 45, 156, 78, 45, 89, 65],
                  },
                ],
                Month: [
                  {
                    name: 'Likes',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      16758, 18786, 14123, 11324, 54002, 34544, 37786, 27657, 42345, 54890, 56789,
                      58905,
                    ],
                  },
                  {
                    name: 'Comments',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      10047, 11272, 8423, 6835, 32459, 20786, 22669, 16540, 25437, 32913, 34174,
                      35342,
                    ],
                  },
                  {
                    name: 'Shares',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      3557, 4821, 2134, 402, 1572, 17234, 6740, 8394, 11454, 21943, 14012, 12580,
                    ],
                  },
                ],
                Hour: [
                  {
                    name: 'Likes',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      89, 34, 12, 4, 14, 25, 145, 234, 123, 183, 210, 280, 290, 310, 289, 420, 402,
                      350, 362, 390, 670, 710, 556, 409, 149,
                    ],
                  },
                  {
                    name: 'Comments',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      40, 15, 5, 2, 6, 11, 67, 110, 60, 88, 102, 138, 141, 151, 141, 405, 297, 270,
                      146, 100, 257, 346, 271, 200, 72,
                    ],
                  },
                  {
                    name: 'Shares',
                    type: 'area',
                    fill: 'gradient',
                    data: [
                      26, 8, 2, 1, 4, 6, 64, 181, 129, 57, 65, 90, 92, 97, 92, 63, 102, 105, 95, 65,
                      167, 294, 106, 40, 47,
                    ],
                  },
                ],
              },
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <GainedFollowers
            title="Total Followers"
            total={18765}
            percent={2.6}
            chart={{
              series: [
                { x: 'Enero', y: 14627 },
                { x: 'Febrero', y: 15782 },
                { x: 'Marzo', y: 14593 },
                { x: 'Abril', y: 13212 },
                { x: 'Mayo', y: 13608 },
                { x: 'Junio', y: 17843 },
                { x: 'Julio', y: 18921 },
                { x: 'Agosto', y: 19221 },
              ],
            }}
          />
          <Box mt={3} /> {/* Aquí se añade el espacio */}
          <GaugeEng
            title="Engagement"
            chart={{
              series: [31.6],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <HottestTrends list={_ecommerceNewProducts} />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AnalyticsSentimentAnalysis
            title="Análisis de Emoción"
            chart={{
              series: [
                { label: 'Felicidad', value: 4344 },
                { label: 'Tristeza', value: 635 },
                { label: 'Enojo', value: 1943 },
                { label: 'Disgusto', value: 843 },
                { label: 'Sorpresa', value: 943 },
                { label: 'Miedo', value: 243 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <ActivityPerHour
            title="Sentimiento Por Hora"
            chart={{
              labels: TIME_LABELS,
              colors: [
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.info.main,
                theme.palette.text.disabled,
              ],
              series: [
                {
                  type: 'Week',
                  data: [
                    { name: 'Positivo', data: [20, 34, 48, 65, 37, 48, 42] },
                    { name: 'Negativo', data: [10, 34, 13, 26, 27, 28, 12] },
                    { name: 'Neutral', data: [10, 14, 13, 16, 17, 18, 8] },
                  ],
                },
                {
                  type: 'Month',
                  data: [
                    { name: 'Positivo', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                    { name: 'Negativo', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                    { name: 'Neutral', data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34] },
                  ],
                },

                {
                  type: 'Hour',
                  data: [
                    {
                      name: 'Positivo',
                      data: [
                        10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34, 10, 34, 13, 56, 77, 88, 99,
                        77, 45, 12, 43, 34,
                      ],
                    },
                    {
                      name: 'Negativo',
                      data: [
                        10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34, 10, 34, 13, 56, 77, 88, 99,
                        77, 45, 12, 43, 34,
                      ],
                    },
                    {
                      name: 'Neutral',
                      data: [
                        10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34, 10, 34, 13, 56, 77, 88, 99,
                        77, 45, 12, 43, 34,
                      ],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline
            title="Top Hashtags"
            list={[
              { title: '#Yolo', subtitle: '1,456 Posts' },
              { title: '#LeonParaPresidente', subtitle: '1,188 Posts' },
              { title: '#RafaBailaElChicharron', subtitle: '1,098 Posts' },
              { title: '#GanaVilla', subtitle: '923 Posts' },
              { title: '#GanaYony', subtitle: '832 Posts' },
              { title: '#Dogecoin', subtitle: '543 Posts' },
            ]}
          />
        </Grid>

        <Grid xs={12}>
          <BestPostingHours
            chart={{
              series: [
                { label: 'Matutino', total: '08:00 AM' },
                { label: 'Vespertino', total: '02:00 PM' },
                { label: 'Tarde', total: '06:00 PM' },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <EngagementPerPost
            title="Engagement Por Tipo de Post"
            list={[
              {
                label: 'Text Post',
                total: 1.45,
                icon: <Image alt="Camera icon" src={penIcon} width={32} height={32} />, // Nota: `height` es requerido
              },
              {
                label: 'Photo Post',
                total: 2.21,
                icon: <Image alt="Camera icon" src={cameraIcon} width={32} height={32} />, // Nota: `height` es requerido
              },
              {
                label: 'Video Post',
                total: 0.98,
                icon: <Image alt="Camera icon" src={videoIcon} width={32} height={32} />, // Nota: `height` es requerido
              },
              {
                label: 'Story',
                total: 4.32,
                icon: <Image alt="Camera icon" src={phoneIcon} width={32} height={32} />, // Nota: `height` es requerido
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <WordCloud
            title="Título de la Word Cloud"
            subheader="Subtítulo si lo deseas"
            positiveWords={[
              { word: 'Justicia', size: 60 },
              { word: 'Igualdad', size: 58 },
              { word: 'Libertad', size: 56 },
              { word: 'Democracia', size: 54 },
              { word: 'Progreso', size: 52 },
              { word: 'Paz', size: 50 },
              { word: 'Solidaridad', size: 48 },
              { word: 'Derechos', size: 46 },
              { word: 'Reforma', size: 44 },
              { word: 'Unidad', size: 42 },
            ]}
            negativeWords={[
              { word: 'Problema', size: 50 },
              { word: 'Crisis', size: 48 },
              { word: 'Corrupción', size: 46 },
              { word: 'Dictadura', size: 44 },
              { word: 'Conflictos', size: 42 },
              { word: 'Recesión', size: 40 },
              { word: 'Desigualdad', size: 38 },
              { word: 'Violencia', size: 36 },
              { word: 'Opressión', size: 34 },
              { word: 'Inestabilidad', size: 32 },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
