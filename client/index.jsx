import React from 'react';
import ReactDOM from 'react-dom';
import Rainbow from 'rainbowvis.js';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerColor: [],
      markers: [],
      properties: []
    };

    this.compare = this.compare.bind(this);
    this.display = this.display.bind(this);
    this.getProperties = this.getProperties.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties() {
    fetch('/properties')
      .then((res) => res.json())
      .then((properties) => {
        properties.sort(this.compare);
        this.setState({ properties, markers: properties });
      })
      .then(() => this.setColor(this.state.properties));
  }

  setColor(markers) {
    const gradient = new Rainbow();
    const total = markers.length;
    gradient.setNumberRange(1, total);
    gradient.setSpectrum('red', 'green');
    const gradientArr = [];

    for (let i = 1; i < total + 1; i += 1) {
      const hex = gradient.colourAt(i);
      gradientArr.push(`#${hex}`);
    }

    this.setState({ markerColor: gradientArr });
  }

  display(markers) {
    new Promise((res) => {
      markers.sort(this.compare);
      res(this.setState({ markers }));
    })
      .then(() => {
        this.setColor(markers);
      });
  }

  compare(a, b) {
    return Number(a.ESTIMATED_MARKET_VALUE.split(',').join('')) - Number(b.ESTIMATED_MARKET_VALUE.split(',').join(''));
  }

  render() {
    return (
      <div>
        <Filters properties={this.state.properties} display={this.display} />
        <Map markers={this.state.markers} colors={this.state.markerColor} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
