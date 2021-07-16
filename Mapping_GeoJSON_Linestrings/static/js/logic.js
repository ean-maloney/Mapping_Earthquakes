// Accessing the airport GeoJSON URL
let json = "torontoRoutes.json";

//Create tile layer and add to map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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
    Light: light,
    Dark: dark
};

//Create map obj
let map = L.map('mapid', {
    center: [44, -80],
    zoom: 2,
    layers: [light]
});

//Pass map layers to layer control and add
L.control.layers(baseMaps).addTo(map);

//Grab geojson data
d3.json(json).then(function(data){
    console.log(data);
    //Add gjson layer
    L.geoJson(data, {
        color: '#ffffa1',
        weight: 2,
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3> Airline: " + feature.properties.airline + '</h3> <hr><h3> Destination: ' + feature.properties.dst + '</h3>');
        }
    }).addTo(map);
});
