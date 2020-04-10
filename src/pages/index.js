import React, { Component } from 'react';
import HomePage from '../components/Home';
import { getCountries } from '../services/index'
class IndexPage extends Component {
  render() {
    const { countries } = this.state;
    return <div>{countries ? <HomePage countries={countries} /> : <p>Loading</p>}</div>;
  }

  state = {
    countries: [],
    response: 'null'
  };

  componentDidMount() {
    getCountries(done => {
      this.setState({ countries: done });
    });
  }
}

export default IndexPage;
