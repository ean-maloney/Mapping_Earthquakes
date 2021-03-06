// Accessing the airport GeoJSON URL
let airportData = "majorAirports.json";

//Create tile layer and add to map
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    accessToken: API_KEY
});

//Add dark tile layer
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create base layer holding maps
let baseMaps = {
    Street: street,
    Dark: dark
};

//Create map obj
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [street]
});

//Pass map layers to layer control and add
L.control.layers(baseMaps).addTo(map);

//Grab geojson data
d3.json(airportData).then(function(data){
    console.log(data);
    //Add gjson layer
    L.geoJson(data).addTo(map);
});
