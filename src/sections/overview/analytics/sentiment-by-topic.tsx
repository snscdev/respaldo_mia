import { Card, CardContent, CardHeader, alpha, styled, useTheme } from '@mui/material';
import Chart from 'react-apexcharts';

const ChartStyled = styled(Chart)(({ theme }) => ({
  '& .apexcharts-treemap-rect': {
    rx: '12',
    ry: '12',
  },
}));

export default function SentimentbyTopic() {
  const theme = useTheme();
  return (
    <Card>
      <CardHeader title="Sentimiento Por Tema" />
      <CardContent>
        <ChartStyled
          series={[
            {
              data: [
                { x: 'Tema 1', y: 30 },
                { x: 'Tema 2', y: 12 },
                { x: 'Tema 3', y: 5 },
                { x: 'Tema 4', y: 5 },
              ],
            },
          ]}
          height="350"
          type="treemap"
          options={{
            chart: {
              type: 'treemap',
              toolbar: {
                show: false,
              },
              /// border radius for all corners
            },
            dataLabels: {
              style: {
                fontSize: '31px',
                fontWeight: '700',
                colors: ['rgba(0, 0, 0, 0.60)'],
              },
            },
            legend: {
              show: false,
            },
            plotOptions: {
              treemap: {
                distributed: true,
                enableShades: false,
              },
            },
            colors: [
              alpha(theme.palette.primary.main, 0.72),
              alpha(theme.palette.primary.main, 0.5),
              alpha(theme.palette.primary.main, 0.5),
              alpha(theme.palette.primary.main, 0.5),
            ],
          }}
        />
      </CardContent>
    </Card>
  );
}
