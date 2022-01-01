import React, { useRef, useEffect, useState } from 'react';
import './Map.css'
import { Box } from '@chakra-ui/react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoieXR0ZXJkdWNrIiwiYSI6ImNreHJtZWEwaDB2MDUycG12YjVwYXF2c2oifQ.kd-EwSm0vDFi0JRtTc1BWQ';



const Map = ({coordinates}) => {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    setLng(coordinates.longitude);
    setLat(coordinates.latitude);
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
    
  });

  return (
      <Box ref={mapContainer} className="map-container" />
  );
};

export default Map;
