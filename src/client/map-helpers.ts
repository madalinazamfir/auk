import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import {REPORT_TYPES} from './useApi';

const createMarker = () => {
    const el = document.createElement('div');
    el.className = 'report-marker bear-sighting';

    const marker = new mapboxgl.Marker(el);

    el.onclick = (e) => {
        e.stopPropagation();
        marker.togglePopup();
    }

    return marker;
}

const createAlertMarker = (bearAlert) => {
    // init a marker
    const marker = createMarker();

    // set the popup text
    const popup = new mapboxgl.Popup({ offset: 25, className: 'report-popup' }).setHTML(
        `
            <h4>${bearAlert.type === REPORT_TYPES.BEAR ? 'Bear sighting' : 'Bear attack'}</h4>
            <p>${bearAlert.contact}</p>
        `
    );
    marker.setPopup(popup);
    marker.getElement().classList.replace(
        bearAlert.type === REPORT_TYPES.BEAR ? 'bear-attack' : 'bear-sighting',
        bearAlert.type === REPORT_TYPES.BEAR ? 'bear-sighting' : 'bear-attack'
    );

    // set marker position and add it to map
    marker.setLngLat([bearAlert.longitude, bearAlert.latitude]);

    return marker;
}

export {createAlertMarker, createMarker};