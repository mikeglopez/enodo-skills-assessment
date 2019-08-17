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
)(() => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{ lat: 41.852347, lng: -87.665986 }}
  >
    <Marker position={{ lat: 41.852347, lng: -87.665986 }} />
  </GoogleMap>
));

export default Map;
