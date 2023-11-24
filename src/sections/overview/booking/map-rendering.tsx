import React, { useState } from 'react';
import Map, { Layer, Source, Popup } from 'react-map-gl';
import rawStatesData from 'src/sections/overview/booking/mexStates.json';
import styles from './MapComponent.module.css';

const typedStatesData: RawStateData[] = rawStatesData as RawStateData[];

type TrendsData = {
    '01': string[];
    '02': string[];
    '03': string[];
};

type RawStateData = {
    geo_point_2d: {
        lon: number;
        lat: number;
    };
    geo_shape: {
        type: "Feature",
        geometry: {
            type: "MultiPolygon",
            coordinates: number[][][][]
        },
        properties: any
    };
    year: string;
    sta_code: string[];
    sta_name: string[];
    sta_area_code: string;
    sta_type: string;
};

const geojsonData: { type: "FeatureCollection", features: any[] } = {
    type: "FeatureCollection",
    features: (rawStatesData as RawStateData[]).map(state => ({
        ...state.geo_shape,
        properties: {
            ...state.geo_shape.properties,
            name: state.sta_name[0],
            code: state.sta_code[0],
            areaCode: state.sta_area_code,
            year: state.year,
            type: state.sta_type
        }
    }))
};

type PopupInfoType = {
    lngLat: [number, number];
    properties: any;
    trends?: string[];
} | null;



const TrendsMapRendering = ({ ...other }) => {
    const [popupInfo, setPopupInfo] = useState<PopupInfoType>(null);

    const trendsData: TrendsData = {
        '01': ["Barbie", "Juguetes Navideños", "Promoción PS5"],
        '02': ["Café Artesanal", "Cerveza Local", "Festival Gastronómico"],
        '03': ["Playa", "Tour Pirámides", "Hotel Boutique"]
    };

    const handleMapMove = (event: any) => {
        const feature = event.features?.[0];
        if (feature) {
            const stateData = typedStatesData.find((state: RawStateData) => state.sta_code[0] === feature.properties.code);
            const center = stateData ? [stateData.geo_point_2d.lon, stateData.geo_point_2d.lat] : event.lngLat.toArray();

            const trends = trendsData[feature.properties.code as keyof typeof trendsData] || [];

            setPopupInfo({
                lngLat: center,
                properties: feature.properties,
                trends,  // Aquí asignas las tendencias obtenidas
            });
        } else {
            setPopupInfo(null);  // Esto ocultará el popup cuando el cursor no esté sobre un estado.
        }
    };


    return (
        <Map
            initialViewState={{
                latitude: 23.6345,
                longitude: -102.5528,
                zoom: 4,
            }}
            onMouseMove={handleMapMove}  // Aquí hemos cambiado a onMouseMove
            interactiveLayerIds={["layer-mexico-states"]} // Esta línea es necesaria para que los eventos sólo se activen en la capa de estados.
            {...other}
        >
            <Source
                id="mexico-states"
                type="geojson"
                data={geojsonData}
            >
                <Layer
                    id="layer-mexico-states"
                    type="fill"
                    paint={{
                        'fill-color': [
                            'match',
                            ['get', 'code'],
                            '01', 'rgba(255, 255, 0, 0.05)',
                            '02', 'rgba(153, 255, 51, 0.05)',
                            '03', 'rgba(0, 255, 153, 0.05)',
                            '04', 'rgba(51, 204, 204, 0.05)',
                            '05', 'rgba(0, 153, 255, 0.05)',
                            '06', 'rgba(102, 0, 204, 0.05)',
                            '07', 'rgba(255, 255, 0, 0.05)',
                            '08', 'rgba(255, 0, 255, 0.05)',
                            '09', 'rgba(0, 0, 0, 0.05)',
                            '10', 'rgba(255, 80, 80, 0.05)',
                            '11', 'rgba(255, 153, 51, 0.05)',
                            '12', 'rgba(153, 255, 51, 0.05)',
                            '13', 'rgba(0, 255, 153, 0.05)',
                            '14', 'rgba(51, 204, 204, 0.05)',
                            '15', 'rgba(0, 153, 255, 0.05)',
                            '16', 'rgba(51, 102, 255, 0.05)',
                            '17', 'rgba(153, 102, 255, 0.05)',
                            '18', 'rgba(255, 0, 255, 0.05)',
                            '19', 'rgba(255, 51, 153, 0.05)',
                            '20', 'rgba(255, 80, 80, 0.05)',
                            '21', 'rgba(255, 255, 0, 0.05)',
                            '22', 'rgba(255, 51, 153, 0.05)',
                            '23', 'rgba(0, 255, 153, 0.05)',
                            '24', 'rgba(51, 204, 204, 0.05)',
                            '25', 'rgba(255, 255, 0, 0.05)',
                            '26', 'rgba(51, 102, 255, 0.05)',
                            '27', 'rgba(153, 102, 255, 0.05)',
                            '28', 'rgba(51, 102, 255, 0.05)',
                            '29', 'rgba(255, 51, 153, 0.05)',
                            '30', 'rgba(153, 255, 51, 0.05)',
                            '31', 'rgba(255, 153, 51, 0.05)',
                            '32', 'rgba(102, 0, 204, 0.05)',
                            'rgba(240, 240, 240, 0.1)' // Color por defecto si no coincide ningún código
                        ],
                        'fill-outline-color': [
                            'match',
                            ['get', 'code'],
                            '01', 'rgba(255, 255, 0, 0.15)',
                            '02', 'rgba(153, 255, 51, 0.15)',
                            '03', 'rgba(0, 255, 153, 0.15)',
                            '04', 'rgba(51, 204, 204, 0.15)',
                            '05', 'rgba(0, 153, 255, 0.15)',
                            '06', 'rgba(102, 0, 204, 0.15)',
                            '07', 'rgba(255, 255, 0, 0.15)',
                            '08', 'rgba(255, 0, 255, 0.15)',
                            '09', 'rgba(0, 0, 0, 0.15)',
                            '10', 'rgba(255, 80, 80, 0.15)',
                            '11', 'rgba(255, 153, 51, 0.15)',
                            '12', 'rgba(153, 255, 51, 0.15)',
                            '13', 'rgba(0, 255, 153, 0.15)',
                            '14', 'rgba(51, 204, 204, 0.15)',
                            '15', 'rgba(0, 153, 255, 0.15)',
                            '16', 'rgba(51, 102, 255, 0.15)',
                            '17', 'rgba(153, 102, 255, 0.15)',
                            '18', 'rgba(255, 0, 255, 0.15)',
                            '19', 'rgba(255, 51, 153, 0.15)',
                            '20', 'rgba(255, 80, 80, 0.15)',
                            '21', 'rgba(255, 255, 0, 0.15)',
                            '22', 'rgba(255, 51, 153, 0.15)',
                            '23', 'rgba(0, 255, 153, 0.15)',
                            '24', 'rgba(51, 204, 204, 0.15)',
                            '25', 'rgba(255, 255, 0, 0.15)',
                            '26', 'rgba(51, 102, 255, 0.15)',
                            '27', 'rgba(153, 102, 255, 0.15)',
                            '28', 'rgba(51, 102, 255, 0.15)',
                            '29', 'rgba(255, 51, 153, 0.15)',
                            '30', 'rgba(153, 255, 51, 0.15)',
                            '31', 'rgba(255, 153, 51, 0.15)',
                            '32', 'rgba(102, 0, 204, 0.15s)',
                            'rgba(240, 240, 240, 0.1)' // Color por defecto si no coincide ningún código
                        ]

                    }}
                />
            </Source>
            {popupInfo && (
                <Popup
                    longitude={popupInfo.lngLat[0]}
                    latitude={popupInfo.lngLat[1]}
                >
                    <div className={styles['popup-content']}>
                        <h4>{popupInfo.properties.name}</h4>
                        <ul>
                            {popupInfo.trends?.map((trend, index) => (
                                <li key={index}>
                                    <strong>#{index + 1}</strong> {trend}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Popup>
            )}


        </Map>
    );
};

export default TrendsMapRendering;