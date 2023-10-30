import { OpenStreetMapProvider } from "leaflet-geosearch";

const lat = 20.666332695977;
const lng = -103.3921777456999;

const map = L.map('map').setView([lat, lng], 15);

document.addEventListener('DOMContentLoaded', () => {

    L.tileLayer('https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
})