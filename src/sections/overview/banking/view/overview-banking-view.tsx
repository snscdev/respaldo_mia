'use client';

// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import OnlinePresenceGraph from '../online-presence-graph';
import SuggestedWords from '../suggested-words';
import UserLatestNews from '../user-latest-news';
import WordCloudRelatedTopics from '../word-cloud-related-topics';
import TopRelatedQueries from '../top-related-queries';
// ----------------------------------------------------------------------

export default function OverviewBankingView() {
  const theme = useTheme();

  const settings = useSettingsContext();
  const TIME_LABELS = {
    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    hour: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
  };
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Online Presence"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Online Presence', href: paths.dashboard.general.banking },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={3}>

        <Grid xs={12} md={12}>
          <Stack spacing={3}>

            <Grid xs={12} sm={12} md={12}>
              <SuggestedWords texts={["Xochitl Para Presidenta", "Xochitl Corrupta", "Muerte A Xochitl", "Quien Es Xochitl"]} />
            </Grid>




            <OnlinePresenceGraph
              title="Interés Del Público"
              subheader="(+1.91%) mes anterior"

              chart={{
                colors: [
                  theme.palette.primary.main,
                ],
                labels: {
                  Week: TIME_LABELS.week,
                  Month: TIME_LABELS.month,
                  Hour: TIME_LABELS.hour
                },
                series: {
                  'Week': [
                    {
                      name: 'Likes',
                      type: 'area',
                      fill: 'gradient',
                      data: [567, 345, 456, 678, 957, 789, 1456],
                    },
                  ],
                  'Month': [
                    {
                      name: 'Likes',
                      type: 'area',
                      fill: 'gradient',
                      data: [16758, 18786, 14123, 11324, 54002, 34544, 37786, 27657, 42345, 54890, 56789, 58905,],
                    },
                  ],
                  'Hour': [
                    {
                      name: 'Likes',
                      type: 'area',
                      fill: 'gradient',
                      data: [89, 34, 12, 4, 14, 25, 145, 234, 123, 183, 210, 280, 290, 310, 289, 420, 402, 350, 362, 390, 670, 710, 556, 409, 149],
                    },
                  ],
                },
              }}
            />

            <Grid container spacing={2}>
              <Grid xs={12} md={6} lg={6}>
                <UserLatestNews list={[
                  {
                    id: '1',
                    header: 'Leon Chavez Hombre Mas Rico Del Mundo',
                    coverUrl: 'data:image/jpeg;base64,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',
                    redirectUrl: 'https://heraldodemexico.com.mx/'
                  },
                  {
                    id: '2',
                    header: 'Rafael Musi Acusado de Homicidio',
                    coverUrl: 'https://media.licdn.com/dms/image/D5603AQHSxeXzMXAsYg/profile-displayphoto-shrink_800_800/0/1683901891012?e=2147483647&v=beta&t=hS0GzdlsIDLCnDyaCbZ51Vc7j6DlDy71doxmGiZSW9E',
                    redirectUrl: 'https://cnnespanol.cnn.com/'
                  },
                  {
                    id: '3',
                    header: 'Xochit Galvez, Tumba La Casa Mami',
                    coverUrl: 'https://cnnespanol.cnn.com/wp-content/uploads/2023/09/230706205808-conclu-xochitl-galvez-full-169.jpg?quality=100&strip=info',
                    redirectUrl: ''
                  },
                  {
                    id: '4',
                    header: 'Ebrad Baila El Chicharron',
                    coverUrl: 'data:image/jpeg;base64,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',
                    redirectUrl: 'https://www.tiktok.com/@m_ebrard/video/7221232686147357957'
                  },
                  {
                    id: '5',
                    header: 'Sheinbaum Muere',
                    coverUrl: 'https://cdn.politico.mx/uploads/images/2022/02/04_sheinbaum_informe_notas_130319_km_6219c64029e7d.jpg',
                    redirectUrl: ''
                  },
                  {
                    id: '6',
                    header: 'Elon Musk Vende X',
                    coverUrl: 'https://media.es.wired.com/photos/64be9a5d721d1170b8ceb3f1/4:3/w_1024,h_768,c_limit/Twitter%201550816669.jpg',
                    redirectUrl: ''
                  },
                ]} />
              </Grid>

              <Grid xs={12} md={6} lg={6}>
                <WordCloudRelatedTopics
                  title="Título de la Word Cloud"
                  words={[
                    { word: "Justicia", size: 60 },
                    { word: "Igualdad", size: 58 },
                    { word: "Revolución", size: 56 },
                    { word: "Solidaridad", size: 54 },
                    { word: "Soberanía", size: 52 },
                    { word: "Derechos", size: 50 },
                    { word: "Pueblo", size: 48 },
                    { word: "Progreso", size: 46 },
                    { word: "Democracia", size: 44 },
                    { word: "Nación", size: 42 },
                  ]}
                />
              </Grid>
            </Grid>

            <Grid xs={12} md={12} lg={12}>
              <TopRelatedQueries
                title="Related Topics"
                subheader="(+43%) than last year"
                topData={[
                  { label: 'Corrupción', value: 400 },
                  { label: 'Muerte', value: 430 },
                  { label: 'Presidenta', value: 448 },
                ]}
                risingData={[
                  { label: 'Casa Caida', value: 500 },
                  { label: 'Que Pasa Si Gana', value: 510 },
                  { label: 'Pan', value: 235 },

                ]}
              />

            </Grid>






          </Stack>
        </Grid>

      </Grid>
    </Container>
  );
}
