//Create map obj
let map = L.map('mapid').setView([30, 30], 2);

L.geoJSON(sanFranAirport, {
    pointToLayer: function(feature, latlng){
        console.log(feature);
        return L.marker(latlng)
        .bindPopup("<h2>" + feature.properties.city + "</h2>");
    }
}).addTo(map);

//Create tile layer and add to map
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);
