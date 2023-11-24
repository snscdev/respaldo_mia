import { alpha, useTheme, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { fShortenNumber } from 'src/utils/format-number';
import { ColorSchema } from 'src/theme/palette';

interface Props extends CardProps {
  title: string;
  total: string | number; // <-- Cambiado aquí
  color?: ColorSchema;
}

// Crear una animación de desplazamiento del gradiente
const slide = keyframes`
    from {
        background-position: 200% center;
    }
    to {
        background-position: -200% center;
    }
`;

export default function BannerOneKpi({ title, total, color = 'primary', sx, ...other }: Props) {
  const theme = useTheme();

  // Estilo para el efecto de gradiente.
  const gradientStyle = {
    background:
      'linear-gradient(90deg, rgba(255,0,150,1) 0%, rgba(0,204,255,1) 50%, rgba(255,0,150,1) 100%)',
    backgroundSize: '200% auto',
    color: theme.palette.getContrastText(alpha(theme.palette[color].main, 0.48)),
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `${slide} 40s linear infinite`,
  };

  return (
    <Card
      {...other}
      sx={{ ...sx, backgroundColor: 'common.white', display: 'flex', alignItems: 'center' }}
    >
      <Box sx={{ flex: '1', textAlign: 'right', mt: 2, mb: 1 }}>
        <Typography variant="h3" sx={{ ...gradientStyle, lineHeight: 1.1 }}>
          {typeof total === 'number' ? fShortenNumber(total) : total}
        </Typography>
      </Box>

      <Box sx={{ flex: '1', textAlign: 'left', pl: 2, mt: 2, mb: 1 }}>
        <Typography variant="subtitle2" sx={{ opacity: 0.64 }}>
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
