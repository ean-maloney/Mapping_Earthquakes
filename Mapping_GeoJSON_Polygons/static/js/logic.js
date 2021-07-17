// Accessing the airport GeoJSON URL
let json = "torontoNeighborhoods.json";

//Create tile layer and add to map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    accessToken: API_KEY
});

//Add dark tile layer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create base layer holding maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets 
};

//Create map obj
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 10,
    layers: [satelliteStreets]
});

//Pass map layers to layer control and add
L.control.layers(baseMaps).addTo(map);

//Grab geojson data
d3.json(json).then(function(data){
    console.log(data);
    //Add gjson layer
    L.geoJson(data, {
        color: 'blue',
        fillColor: 'yellow',
        weight: 1
    }).addTo(map);
});
