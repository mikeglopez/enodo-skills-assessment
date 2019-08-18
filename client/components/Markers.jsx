import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';

class Markers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfoWindow: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseExit = this.handleMouseExit.bind(this);
  }

  handleMouseOver() {
    this.setState({
      showInfoWindow: true
    });
  }

  handleMouseExit() {
    this.setState({
      showInfoWindow: false
    });
  }

  render() {
    const { showInfoWindow } = this.state;
    const { info, lat, lng } = this.props;
    return (
      <Marker
        position={{ lat, lng }}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseExit}
      >
        {showInfoWindow && (
          <InfoWindow>
            <h4>{info}</h4>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default Markers;
