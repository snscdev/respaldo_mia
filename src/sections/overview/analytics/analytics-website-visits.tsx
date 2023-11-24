// @mui
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
// components
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { useState, useCallback } from 'react';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    labels: {
      Week: string[];
      Month: string[];
      Hour: string[];
    };
    series: {
      Week: {
        name: string;
        type: string;
        fill?: string;
        data: number[];
      }[];
      Month: {
        name: string;
        type: string;
        fill?: string;
        data: number[];
      }[];
      Hour: {
        name: string;
        type: string;
        fill?: string;
        data: number[];
      }[];
    };
    colors: string[]; // suponiendo que es un array de strings
    options?: any; // o el tipo adecuado para 'options'
  };
}

export default function AnalyticsWebsiteVisits({ title, subheader, chart, ...other }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [seriesData, setSeriesData] = useState<'Week' | 'Month' | 'Hour'>('Week');

  const { labels, series, options, colors } = chart;

  const currentLabels =
    (seriesData === 'Week' && labels.Week) ||
    (seriesData === 'Month' && labels.Month) ||
    labels.Hour;

  const currentSeries =
    (seriesData === 'Week' && series.Week) ||
    (seriesData === 'Month' && series.Month) ||
    series.Hour;

  const popover = usePopover();

  const handleChangeSeries = useCallback(
    (newValue: SeriesOption) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  type SeriesOption = 'Week' | 'Month' | 'Hour';
  const seriesOptions: SeriesOption[] = ['Week', 'Month', 'Hour'];

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    labels: currentLabels,
    fill: {
      type: currentSeries.map((i) => i.fill) as string[],
    },
    xaxis: {
      categories: currentLabels,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          <ButtonBase
            onClick={popover.onOpen}
            sx={{
              pl: 1,
              py: 0.5,
              pr: 0.5,
              borderRadius: 1,
              typography: 'subtitle2',
              bgcolor: 'background.neutral',
            }}
          >
            {seriesData}
            <Iconify
              width={16}
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              sx={{ ml: 0.5 }}
            />
          </ButtonBase>
        }
      />

      <Box sx={{ p: 3, pb: 1, position: 'relative' }}>
        <Chart dir="ltr" type="line" series={currentSeries} options={chartOptions} height={364} />

        <Box sx={{ position: 'absolute', bottom: 8, right: 8 }}>
          <Tooltip title="Información adicional chiquita para info rapida. Click Para Mas Info">
            <IconButton size="small" onClick={handleOpenDialog} sx={{ opacity: 0.6 }}>
              <HelpOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Mamadas Del Rafa</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Aquí vamos a agregar aun ams informacion para que los pendejos del heraldo no la
                caguen.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {seriesOptions.map((option: SeriesOption) => (
          <MenuItem
            key={option}
            selected={option === seriesData}
            onClick={() => handleChangeSeries(option)}
          >
            {option}
          </MenuItem>
        ))}
      </CustomPopover>
    </Card>
  );
}
