'use client';

// @mui
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
// _mock
// components
import { useSettingsContext } from 'src/components/settings';
//
import TrendsMap from '../trends-map';
import TopTrendsRankings from '../top-trends-ranking';
import TopTrendingTrends from '../top-trending-trends';
// ----------------------------------------------------------------------

const SPACING = 3;

export default function OverviewBookingView() {

  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Trends"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Trends', href: paths.dashboard.general.booking },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={SPACING} disableEqualOverflow>

        <Grid xs={12} md={12}>
          <TrendsMap />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <TopTrendsRankings
            title="Top Trends Global"
            list={[
              { rank: 1, name: 'Author 1', change: 1, type: 'POS' },
              { rank: 2, name: 'Author 2', change: 2 , type: 'POS'},
              { rank: 3, name: 'Author 3', change: 3 , type: 'POS'},
              { rank: 4, name: 'Author 4', change: 4 , type: 'NEG' },
              { rank: 5, name: 'Author 5', change: 5 , type: 'NEG' },
              { rank: 6, name: 'Author 6', change: 6 , type: 'NEG' },
              { rank: 7, name: 'Author 7', change: 7 , type: 'NEG' },
              { rank: 8, name: 'Author 8', change: 8 , type: 'NEG' },
              { rank: 9, name: 'Author 9', change: 9 , type: 'NEG' },
              { rank: 10, name: 'Author 10', change: 10 , type: 'NEG' },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TopTrendsRankings
            title="Top Trends México"
            list={[
              { rank: 1, name: 'eL CHICHARRON', change: 1, type: 'POS' },
              { rank: 2, name: 'Barbie', change: 2 , type: 'POS'},
              { rank: 3, name: 'Pelea del Canelo', change: 3 , type: 'POS'},
              { rank: 4, name: 'Author 4', change: 4 , type: 'NEG' },
              { rank: 5, name: 'Author 5', change: 5 , type: 'NEG' },
              { rank: 6, name: 'Author 6', change: 6 , type: 'NEG' },
              { rank: 7, name: 'Author 7', change: 7 , type: 'NEG' },
              { rank: 8, name: 'Author 8', change: 8 , type: 'NEG' },
              { rank: 9, name: 'Author 9', change: 9 , type: 'NEG' },
              { rank: 10, name: 'Author 10', change: 10 , type: 'NEG' },
            ]}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <TopTrendsRankings
            title="Top Trends CDMX"
            list={[
              { rank: 1, name: 'Author 1', change: 1, type: 'POS' },
              { rank: 2, name: 'Author 2', change: 2 , type: 'POS'},
              { rank: 3, name: 'Author 3', change: 3 , type: 'POS'},
              { rank: 4, name: 'Author 4', change: 4 , type: 'NEG' },
              { rank: 5, name: 'Author 5', change: 5 , type: 'NEG' },
              { rank: 6, name: 'Author 6', change: 6 , type: 'NEG' },
              { rank: 7, name: 'Author 7', change: 7 , type: 'NEG' },
              { rank: 8, name: 'Author 8', change: 8 , type: 'NEG' },
              { rank: 9, name: 'Author 9', change: 9 , type: 'NEG' },
              { rank: 10, name: 'Author 10', change: 10 , type: 'NEG' },
            ]}
          />
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <TopTrendingTrends
            title="Top Trending Trends"
            list={[
              { rank: 1, name: 'Author 1', change: 1, type: 'POS' },
              { rank: 2, name: 'Author 2', change: 2 , type: 'POS'},
              { rank: 3, name: 'Author 3', change: 3 , type: 'POS'},
              { rank: 4, name: 'Author 4', change: 4 , type: 'NEG' },
              { rank: 5, name: 'Author 5', change: 5 , type: 'NEG' },
              { rank: 6, name: 'Author 6', change: 6 , type: 'NEG' },
              { rank: 7, name: 'Author 7', change: 7 , type: 'NEG' },
              { rank: 8, name: 'Author 8', change: 8 , type: 'NEG' },
              { rank: 9, name: 'Author 9', change: 9 , type: 'NEG' },
              { rank: 10, name: 'Author 10', change: 10 , type: 'NEG' },
            ]}
          />
        </Grid>
      </Grid >
    </Container >
  );
}
