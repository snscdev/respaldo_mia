// @mui
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
// utils
import { fNumber } from 'src/utils/format-number';
// components
import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------
interface Props extends CardProps {
    title?: string;
    subheader?: string;
    topData: {
        label: string;
        value: number;
    }[];
    risingData: {
        label: string;
        value: number;
    }[];
}

export default function TopRelatedQueries({
    title,
    subheader,
    topData,
    risingData,
    ...other
}: Props) {

    const [dataSet, setDataSet] = useState('Top');

    const handleDataSetChange = (event: React.MouseEvent<HTMLElement>, newDataSet: string) => {
        if (newDataSet !== null) {
            setDataSet(newDataSet);
        }
    };

    const currentData = dataSet === 'Top' ? topData : risingData;
    const chartSeries = currentData.map((i) => i.value);
    const theme = useTheme();
    const currentColor = dataSet === 'Top' ? theme.palette.primary.main : theme.palette.error.main;

    const chartOptions = useChart({
        colors: [currentColor],
        
        tooltip: {
            marker: { show: false },
            y: {
                formatter: (value: number) => fNumber(value),
                title: {
                    formatter: () => '',
                },
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: '28%',
                borderRadius: 2,
            },
        },
        xaxis: {
            categories: currentData.map((i) => i.label),
            labels: {
                style: {
                    fontWeight: 'bold'  // Hace que el texto del eje X sea en negritas
                }
            }
        },
    });
    

    return (
        <Card {...other}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2 }}>
                <CardHeader title={title} subheader={subheader} />

                {/* 2. Añadir margen superior y estilos de texto al ToggleButtonGroup */}
                <ToggleButtonGroup
                    value={dataSet}
                    exclusive
                    onChange={handleDataSetChange}
                    aria-label="data set"
                    sx={{ marginTop: 2 }}
                >
                    <ToggleButton value="Top" aria-label="Top" sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.8)' }}>
                        Top
                    </ToggleButton>
                    <ToggleButton value="Rising" aria-label="Rising" sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.8)' }}>
                        Rising
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ mx: 3 }}>
                <Chart
                    type="bar"
                    dir="ltr"
                    series={[{ data: chartSeries }]}
                    options={chartOptions}
                    height={364}
                />
            </Box>
        </Card>
    );
}
