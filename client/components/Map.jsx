import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs, withGoogleMap, GoogleMap
} from 'react-google-maps';
import Markers from './Markers.jsx';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`,
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
      <Markers info={home['Full Address']} lat={Number(home.Longitude)} lng={Number(home.Latitude)} key={i} index={i} colors={props.colors} />
    ))}
  </GoogleMap>
));

export default Map;
