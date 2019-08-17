import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap, Marker
} from 'react-google-maps';
import token from '../../config.js';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${token}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '600px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: 41.899649, lng: -87.669845 }}
  >
    {props.markers.map((home, i) => (
      <Marker position={{ lat: Number(home.Longitude), lng: Number(home.Latitude) }} key={i} />
    ))}
  </GoogleMap>
));

export default Map;
