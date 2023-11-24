import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const StyledChart = styled(ReactApexChart)(({ theme }) => ({
  width: '100%',
  height: '100%',
  maxWidth: '400px',
  maxHeight: '400px',
  margin: '0 auto',
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
    width: `100% !important`,
  },
}));

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    series: number[];
    options?: ApexOptions;
  };
}

export default function GaugeEng({ title, subheader, chart, ...other }: Props) {
  const { series, options } = chart;
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chartOptions: ApexOptions = {
    chart: {
      height: 50, // Altura fija
      type: 'radialBar',
      offsetY: -10,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.15,
        gradientToColors: ['#b1a306', '#99b106'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [
          {
            offset: 0,
            color: '#b14f06',
            opacity: 1,
          },
          {
            offset: 50,
            color: '#b1a306',
            opacity: 1,
          },
          {
            offset: 100,
            color: '#99b106',
            opacity: 1,
          },
        ],
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '0rem',
            fontWeight: 'bold',
            color: '#72777e',
            offsetY: 0,
          },
          value: {
            offsetY: -5,
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#000',
            formatter: function formatPercentage(val) {
              return `${val / 10}%`;
            }
          },
        },
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: [],
    ...options,
  };

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: -1 }} />
      <StyledChart
        options={chartOptions}
        series={series}
        type="radialBar"
        sx={{ mb: 2, position: 'relative' }}
      />

      <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
        <Tooltip title="Información adicional">
          <IconButton size="small" onClick={handleOpenDialog} sx={{ opacity: 0.6 }}>
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Título del Diálogo</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aquí puedes agregar el texto o contenido que desees mostrar en la ventana emergente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Card>
  );
}
