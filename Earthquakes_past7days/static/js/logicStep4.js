// Accessing the airport GeoJSON URL
let json = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

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
    "Satellite": satelliteStreets 
};

let earthquakes = new L.layerGroup();
let overlays = {
    Earthquakes: earthquakes
};

//Create map obj
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

//Pass map layers to layer control and add
L.control.layers(baseMaps, overlays).addTo(map);

//Grab geojson data
d3.json(json).then(function(data){
    console.log(data);
    //Add gjson layer
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function(feature, layer){
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    let legend = L.control({
        position: "bottomright"
    });

    legend.onAdd = function(){
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0,1,2,3,4,5];
        const colors = [  "#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"]
        
        for(var i = 0; i < magnitudes.length; i++){
            console.log(colors[i]);
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] +
            "<br>" : "+");
        };

        return div;
    };

    legend.addTo(map);
    earthquakes.addTo(map);
});

function styleInfo(feature){
    return { 
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };

    function getRadius(mag){
        if(mag === 0){
            return 1;
        }else{
            return mag*4;
        }
    };

    function getColor(mag){
        if(mag > 5){
            return "#ea2c2c";
        }if(mag > 4){
            return "#ea822c";
        }if(mag > 3){
            return "#ee9c00";
        }if(mag > 2){
            return "#eecc00";
        }if(mag > 1){
            return "#d4ee00";
        }else{
            return "#98ee00";
        }
    };
}
