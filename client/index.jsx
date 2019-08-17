/* eslint-disable react/no-unused-state */
import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: []
    };

    this.getProperties = this.getProperties.bind(this);
  }

  componentDidMount() {
    this.getProperties();
  }

  getProperties() {
    fetch('/properties')
      .then((res) => res.json())
      .then((properties) => {
        this.setState({ properties });
      });
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
