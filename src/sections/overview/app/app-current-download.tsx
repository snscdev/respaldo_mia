import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}
export default function AppCurrentDownload({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();
  const { colors, options } = chart;
  const series = [
    {
      name: 'Posts',
      data: [44, 55, 41],
    },
    {
      name: 'Likes',
      data: [13, 23, 20],
    },
    {
      name: 'Comments',
      data: [11, 17, 15],
    },
  ];
  
  const categories = ['Twitter', 'Facebook', 'Instagram'];
  const chartOptions = useChart({
    chart: {
      type: 'bar',
      stacked: true,
    },
    colors,
    xaxis: {
      categories,
    },
    stroke: { colors: [theme.palette.background.paper] },
    legend: {
      offsetY: 0,
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (value: number) => fNumber(value),
        title: {
          formatter: (seriesName: string) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius:10,
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <StyledChart type="bar" series={series} options={chartOptions} />
    </Card>
  );
}