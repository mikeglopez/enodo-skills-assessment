import React from 'react';
import ReactDOM from 'react-dom';
import Rainbow from 'rainbowvis.js';
import styled from 'styled-components';
import Filters from './components/Filters.jsx';
import Map from './components/Map.jsx';

const Wrapper = styled.div`
  color: #303133;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  margin: auto;
  width: 60%;

  a {
    text-decoration: none;
  }

  a:link, a:active, a:visited {
    color: #666666
  }

  a:hover {
    color: #333333;
  }

  .button {
    background-color: #409EFF;
    border-radius: 4px;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 14px;
    margin-left: 10px;
    outline: none;
    padding: 12px 20px;
  }

  .button:active {
    background-color: #3A8EE6;
  }

  .button:hover {
    background-color: #66B1FF;
  }

  label {
    margin-left: 10px;
  }
`;

const Top = styled.div`
  padding: 20px;
`;

const Note = styled.h6`
  display: block;
  font-size: 12px;
  font-weight: 400;

`;

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
    gradient.setSpectrum('#F56C6C', '#67C23A');
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
      <Wrapper>
        <Top>
          <Filters properties={this.state.properties} display={this.display} />
        </Top>
        <Map markers={this.state.markers} colors={this.state.markerColor} />
        <Note>Note: Google Map will show &quot;For development purposes only&quot; Click &quot;OK&quot; to continue.</Note>
      </Wrapper>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
