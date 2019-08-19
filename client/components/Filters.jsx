import React from 'react';

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      max: 0,
      min: 0,
      mode: '',
      value: '',
    };

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      <div>
        <select value={this.state.category} onChange={this.handleCategoryChange}>
          <option defaultValue>Select a Filter</option>
          {vals.map((val, i) => (
            <option value={val} key={i}>{val}</option>
          ))}
        </select>
        <input type="submit" value="Submit" />
      </div>
    );
  }

  displayNum() {
    return (
      <div>
        <label>
          min:
          <input name="min" type="number" value={this.state.min} onChange={this.handleInputChange} />
        </label>
        <label>
        max:
          <input name="max" type="number" value={this.state.max} onChange={this.handleInputChange} />
        </label>
        <input type="submit" value="Submit" />
      </div>
    );
  }

  handleCategoryChange(event) {
    this.setState({ category: event.target.value });
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

  handleInputChange(event) {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  handleSubmit(event) {
    if (this.state.mode === 'categorical') {
      this.props.display(this.props.properties.filter((property) => property[this.state.value] === this.state.category));
    }

    if (this.state.mode === 'numeric') {
      const val = this.state.value;
      this.props.display(this.props.properties.filter((property) => (Number(property[val].split(',').join('')) < Number(this.state.max.split(',').join(''))) && (Number(property[val].split(',').join('')) > Number(this.state.min.split(',').join('')))));
    }
    event.preventDefault();
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
        <form onSubmit={this.handleSubmit}>
          <select value={this.state.value} onChange={this.handleFilterChange}>
            <option defaultValue>Select a Category</option>
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
