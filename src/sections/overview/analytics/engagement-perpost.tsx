import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import { fShortenNumber } from 'src/utils/format-number';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: {
    label: string;
    total: number;
    icon: JSX.Element; // Cambiamos el tipo del icono para aceptar un elemento JSX.
  }[];
}

export default function EngagementPerPost({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((site) => (
          <Paper key={site.label} variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
            {site.icon} {/* Aquí simplemente renderizamos el elemento del icono directamente. */}
            <Typography variant="h6" sx={{ mt: 0.5 }}>
              {`${fShortenNumber(site.total)}%`}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {site.label}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Card>
  );
}
