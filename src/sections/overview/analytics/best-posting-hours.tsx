import { useTheme, alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { useResponsive } from 'src/hooks/use-responsive';

interface Props extends CardProps {
  chart: {
    series: {
      label: string;
      total: string;
    }[];
  };
}

export default function BestPostingHours({ chart, ...other }: Props) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  const { series } = chart;

  const getColorByRank = (rank: number) => {
    switch (rank) {
      case 1:
        return theme.palette.success.darker;
      case 2:
        return theme.palette.success.main;
      case 3:
        return theme.palette.success.lighter;
      case 4:
        return theme.palette.warning.main;
      case 5:
        return theme.palette.warning.dark;
      default:
        return theme.palette.text.primary;
    }
  };

  return (
    <Card {...other}>
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
        {series.map((item, index) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1}
            sx={{
              width: 1,
              py: 3,
              bgcolor: alpha(getColorByRank(index + 1), 0.3),
            }}
          >
            <Typography variant="h4" color={getColorByRank(index)} sx={{ mr: 2 }}>
              #{index + 1}
            </Typography>
            <div>
              <Typography variant="h4" sx={{ mb: -0.5, color: 'black' }}>
                {item.total}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.72 }}>
                {item.label}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
