import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CardProps } from '@mui/material/Card';
import { bgGradient } from 'src/theme/css';
import { fShortenNumber } from 'src/utils/format-number';
import { ColorSchema } from 'src/theme/palette';

interface Props extends CardProps {
  title: string;
  total: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: ColorSchema;
  iconWidth?: number | string;
  iconHeight?: number | string;
}

export default function AnalyticsWidgetSummary({
  title,
  total,
  icon: IconComponent,
  color = 'primary',
  iconWidth = 64,
  iconHeight = 64,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette[color].light, 0.2),
          endColor: alpha(theme.palette[color].main, 0.2),
        }),
        p: 3,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: `${color}.darker`,
        backgroundColor: 'common.white',
        backdropFilter: `blur(3px) saturate(150%)`,
        boxShadow: `0 4px 12px 0 ${alpha(theme.palette[color].dark, 0.11)}`,
        ...sx,
      }}
      {...other}
    >
      {IconComponent && <IconComponent width={iconWidth} height={iconHeight} />}
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
          {fShortenNumber(total)}
        </Typography>
        <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
