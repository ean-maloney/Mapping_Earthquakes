//Confirm code is running
console.log("working");

//Create map obj
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

//Create tile layer and add to map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(map);

//Add marker for LA
let marker = L.marker([34.0522, -118.2437]).addTo(map);

//Add circle for LA
L.circleMarker([34.0522, -118.2437], {
    color:'black',
    fillColor: 'yellow',
    radius: 5
}).addTo(map);