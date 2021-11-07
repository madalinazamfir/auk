import React, { useEffect, useLayoutEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import AddReportModal from './AddReportModal';
import useApi from './useApi';

import {createMarker, createAlertMarker} from './map-helpers';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkbmVjIiwiYSI6ImNrdm50dzdyNDBvOGEyc2pwM3BhMTRqa3gifQ.Db0m4qF78rBUL3vEIOMHCg';

const Map = () => {
    const [addedMarker, setAddedMarker] = useState(null);
    const [isAddAlertModalVisible, setIsAddAlertModalVisible] = useState(false);
    const [mapInstance, setMapInstance] = useState(null);
    const {loadData} = useApi();

    // handler for click event in map
    const onMapClick = (event, map) => {
        // init a marker
        const marker = createMarker();

        // set marker position and add it to map
        marker.setLngLat([event.lngLat.lng, event.lngLat.lat]);
        marker.addTo(map);

        // track added marker
        setAddedMarker(marker);

        // show the modal
        setIsAddAlertModalVisible(true);
    };

    // initialize map and intercept events
    useLayoutEffect(() => {
        const map = new mapboxgl.Map({
            container: 'mainmap',
            style: 'mapbox://styles/mapbox/light-v10',
            maxBounds: new mapboxgl.LngLatBounds([0, 66.5], [360, 90])
        });

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                // When active the map will receive updates to the device's location as it changes.
                trackUserLocation: true,
                // Draw an arrow next to the location dot to indicate which direction the device is heading.
                showUserHeading: true
            })
        );

        map.on('click', (e) => onMapClick(e, map));

        setMapInstance(map);
    }, []);

    // await bearAlerts to load and add returned markers to map
    useEffect(() => {
        if (!mapInstance) {
            return;
        }

        const loadMarkers = async () => {
            const bearAlerts = await loadData();

            // add markers
            bearAlerts.forEach((bearAlert) => {
                const marker = createAlertMarker(bearAlert);
                marker.addTo(mapInstance);
            });
        };

        loadMarkers();
    }, [mapInstance]);

    return (
        <>
            <div id="mainmap" ></div>

            <AddReportModal
                isVisible={isAddAlertModalVisible}
                marker={addedMarker}
                onAdded={() => setIsAddAlertModalVisible(false)}
                onCancel={() => {
                    setIsAddAlertModalVisible(false)
                    addedMarker.remove()
                }}
            />
        </>
    );
};

export default Map;