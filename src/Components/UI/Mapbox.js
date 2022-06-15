import React, {useState} from 'react'
import ReactMapGL from 'react-map-gl';

function Mapbox() {
    var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZG9hbnRvdG5naGllcDExMyIsImEiOiJjbDFzbmx3bGYxMWpkM2hwdDN4ZHFvNDQ5In0._MA3dd-zADa5W5Io4h-xnA';
    var map = new mapboxgl.Map({
    container: 'YOUR_CONTAINER_ELEMENT_ID',
    style: 'mapbox://styles/mapbox/streets-v11'
    });
  const [viewport,setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 21.0244246,
    longitude: 105.7938072,
    zoom: 16
  });  
  return (<ReactMapGL
      {... viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapboxAccessToken="pk.eyJ1IjoiZG9hbnRvdG5naGllcDExMyIsImEiOiJjbDFzbmx3bGYxMWpkM2hwdDN4ZHFvNDQ5In0._MA3dd-zADa5W5Io4h-xnA"
      />

  )
}

export default Mapbox