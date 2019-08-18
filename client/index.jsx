import React from 'react';
import ReactDOM from 'react-dom';
import Rainbow from 'rainbowvis.js';
import Map from './components/Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: [],
      markerColor: []
    };

    this.getProperties = this.getProperties.bind(this);
    this.setColor = this.setColor.bind(this);
    this.compare = this.compare.bind(this);
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties() {
    fetch('/properties')
      .then((res) => res.json())
      .then((properties) => {
        properties.sort(this.compare);
        this.setState({ properties });
      })
      .then(() => this.setColor());
  }

  setColor() {
    const gradient = new Rainbow();
    const total = this.state.properties.length;
    gradient.setNumberRange(1, total);
    gradient.setSpectrum('red', 'green');
    const gradientArr = [];

    for (let i = 0; i < total; i += 1) {
      const hex = gradient.colourAt(i);
      gradientArr.push(`#${hex}`);
    }

    this.setState({ markerColor: gradientArr });
  }

  compare(a, b) {
    return Number(a.ESTIMATED_MARKET_VALUE.split(',').join('')) - Number(b.ESTIMATED_MARKET_VALUE.split(',').join(''));
  }

  render() {
    return (
      <div>
        <Map markers={this.state.properties} colors={this.state.markerColor} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
