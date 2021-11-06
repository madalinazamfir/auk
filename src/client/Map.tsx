import React from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import { useLayoutEffect } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoiZWR1YXJkbmVjIiwiYSI6ImNrdm50dzdyNDBvOGEyc2pwM3BhMTRqa3gifQ.Db0m4qF78rBUL3vEIOMHCg';

const Map = () => {

    useLayoutEffect(() => {
        new mapboxgl.Map({
            container: 'mainmap',
            style: 'mapbox://styles/mapbox/light-v10',
            maxBounds: new mapboxgl.LngLatBounds([0, 66.5], [360, 90])
        });
    });

    return <div id="mainmap"></div>
};

export default Map;