import React, { useState } from 'react';
import orderBy from 'lodash/orderBy';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// utils
import { fShortenNumber } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';

type ItemType = 'POS' | 'NEG';

type ItemProps = {
    rank: number;  // Cambio de 'id' (string) a 'rank' (number)
    name: string;
    avatarUrl?: string;
    change: number;
    type: ItemType;
};

interface Props extends CardProps {
    title?: string;
    subheader?: string;
    list: ItemProps[];
}

export default function TopTrendsRankings({ title, subheader, list, ...other }: Props) {
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />

            <Stack spacing={3} sx={{ p: 3 }}>
                {orderBy(list, ['rank'], ['asc']).slice(0, expanded ? 10 : 3).map((author, index) => (
                    <AuthorItem key={author.rank} author={author} index={index} />
                ))}
            </Stack>

            {/* Box para centrar el botón */}
            <Box display="flex" justifyContent="center" alignItems="center" py={1}>
                <IconButton
                    onClick={handleExpandClick}
                    sx={{
                        transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: theme.transitions.create('transform', {
                            duration: theme.transitions.duration.shortest,
                        }),
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Box>
        </Card>
    );
}

// ----------------------------------------------------------------------

type AuthorItemProps = {
    author: ItemProps;
    index: number;
};

function AuthorItem({ author, index }: AuthorItemProps) {

    const displayChange = () => {
        const sign = author.type === 'POS' ? '+' : '-';
        return `${sign}${fShortenNumber(author.change)}%`; // Agregamos el signo de porcentaje al final
    };

    const setIcon = ( indexIcon: number ) => {
        let icon;
        if (indexIcon === 0) {
            icon = "tabler:hexagon-number-1";
        } else if (indexIcon === 1) {
            icon = "tabler:hexagon-number-2";
        } else {
            icon = "tabler:hexagon-number-3";
        }

        return icon
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2">{author.name}</Typography>

                <Typography
                    variant="caption"
                    sx={{
                        mt: 0.5,
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary',
                    }}
                >
                    <Iconify icon="ci:trending-up" width={16} sx={{ mr: 0.5 }} />
                    {displayChange()}
                </Typography>
            </Box>

            {index < 3 && (  // Condición para mostrar solo en el top 3
                <Iconify
                    icon={setIcon( index )}
                    sx={{
                        p: 1,
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        ...(index === 0 && {  // 1er Lugar
                            color: 'primary.main',
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        }),
                        ...(index === 1 && {  // 2do Lugar
                            color: 'info.main',
                            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                        }),
                        ...(index === 2 && {  // 3er Lugar
                            color: 'error.main',
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                        }),
                    }}
                />
            )}
        </Stack>
    );
}

