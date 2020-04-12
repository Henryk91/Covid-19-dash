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
    const time = 1000 * 60 * 10; // Update every 10 minute;
    setInterval(() => {
      console.log('Calling new data.', new Date());
      getCountries(done => {
        this.setState({ countries: done });
      });
    },time);
  }
}

export default IndexPage;
