'use client';

import dynamic from 'next/dynamic';
// @mui
import { styled } from '@mui/material/styles';

import Stack from '@mui/material/Stack';

// config
import { MAPBOX_API } from 'src/config-global';

//

const MapRendering = dynamic(() => import('./map-rendering'));

// ----------------------------------------------------------------------

const THEMES = {
    streets: 'mapbox://styles/mapbox/streets-v11',
    outdoors: 'mapbox://styles/mapbox/outdoors-v11',
    light: 'mapbox://styles/mapbox/light-v10',
    dark: 'mapbox://styles/mapbox/dark-v10',
    satellite: 'mapbox://styles/mapbox/satellite-v9',
    satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
    mapboxAccessToken: MAPBOX_API,
    minZoom: 1,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
    zIndex: 0,
    height: 590,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
        display: 'none',
    },
}));

// ----------------------------------------------------------------------

export default function TrendsMap() {
    return (
        <Stack spacing={5}>
            <StyledMapContainer>
                <MapRendering {...baseSettings} mapStyle={THEMES.light} />
            </StyledMapContainer>
        </Stack>

    );
}
