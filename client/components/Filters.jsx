import React from 'react';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      mode: '',
      value: '',
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.displayCat = this.displayCat.bind(this);
    this.displayNum = this.displayNum.bind(this);
  }

  displayCat() {
    let vals = [];

    if (this.props.properties[0]) {
      this.props.properties.forEach((property) => {
        vals.push(property[this.state.value]);
      });
      vals = [...new Set(vals)];
    }

    return (
      <select value={this.state.category} onChange={this.handleCategoryChange}>
        {vals.map((val, i) => (
          <option value={val} key={i}>{val}</option>
        ))}
      </select>
    );
  }

  displayNum() {
    console.log('numeric');
    return (
      <div>
        Woof
      </div>
    );
  }

  handleCategoryChange(event) {
    new Promise((res) => {
      res(this.setState({ category: event.target.value }));
    })
      .then(() => {
        // change the viewed items
      });
  }

  handleFilterChange(event) {
    new Promise((res) => {
      res(this.setState({ value: event.target.value }));
    })
      .then(() => {
        const categorical = ['Full Address', 'REC_TYPE', 'CLASS_DESCRIPTION', 'LOC', 'DIR', 'STREET', 'SUFFIX', 'APT',
          'CITY', 'RES_TYPE', 'BLDG_USE', 'EXT_DESC', 'BSMT_DESC', 'ATTIC_DESC', 'GAR_DESC', 'SALE_DATE', 'APPEAL_A_STATUS',
          'APPEAL_A_RESULT', 'APPEAL_A_PIN_RESULT', 'APPEAL_A_RESLTDATE'];

        if (categorical.includes(this.state.value)) {
          this.setState({ mode: 'categorical' });
        } else if (this.state.value === '') {
          this.setState({ mode: '' });
        } else {
          this.setState({ mode: 'numeric' });
        }
      });
  }


  render() {
    let keys = [];
    let filters;

    if (this.props.properties[0]) {
      keys = Object.keys(this.props.properties[0]);
    }

    if (this.state.mode === 'categorical') {
      filters = this.displayCat();
    } else if (this.state.mode === 'numeric') {
      filters = this.displayNum();
    }

    return (
      <div>
        <form>
          <select value={this.state.value} onChange={this.handleFilterChange}>
            {keys.map((key, i) => (
              <option value={key} key={i}>{key}</option>
            ))}
          </select>
          {filters}
        </form>
      </div>
    );
  }
}

export default Filters;
