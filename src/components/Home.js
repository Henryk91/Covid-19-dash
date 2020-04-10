import React from 'react';
import Helmet from 'react-helmet';
import Layout from 'components/Layout';
import Container from 'components/Container';
import LeftInfo from 'components/Left-info';
import RightInfo from 'components/Right-info';
import MapWrap from 'components/MapWrap';


export default class HomePage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        countries: this.props.countries,
        timeData: null,
        selectedFilter: 'all'
      };
    }

  isSelected = (name) =>{
    const {selectedFilter} = this.state;
    if(selectedFilter === name) return 'selected'
    return;
  }
  filterMap = (name) => {
    this.setState({selectedFilter: name})
  }

  countryCount(data){
    let c = data.map(item => item = item.country);
    c = c.filter((v, i, a) => a.findIndex(val => val === v) === i);
    return c.length;
  }
  render() {

    const {selectedFilter, timeData} = this.state
    const data = this.props.countries
    const totalCountries = this.countryCount(data);
  return (
    <Layout pageName="home">
      <Helmet>
        <title>Data Map</title>
      </Helmet>
      
      <div className="main-container">
          <LeftInfo countries={data}/>
        <div id="home-wrapper">
          {
            selectedFilter === 'active'? 
            <MapWrap countries={data} filter={'active'}/>: 
            <MapWrap countries={data} filter={'all'}/>
          }
          
          <div className="map-toggle">
            <div className={`grey-border filter-button map-toggle-left ${this.isSelected('all')}`} onClick={() => {this.filterMap('all')}}>Confirmed Cases</div>
            <div className={`grey-border filter-button ${this.isSelected('active')}`} onClick={() => {this.filterMap('active')}}>Active Cases</div>
          </div>
            <Container type="content" className="text-center home-start">
              
              <div className="bottom-box grey-border" id="left-box">
                <p className="bottom-number">{totalCountries}</p>
                <p className="bottom-number-title">countries/regions</p>
              </div>
              <div className="bottom-box grey-border" id="right-box">
                {/* <p className="note1">React Gatsby Corona Map</p> */}
                <p className="data-show">{JSON.stringify(data)}</p>
              </div>
            </Container>
        </div>
          <RightInfo countries={data}/>
      </div>
    </Layout>
  );
  }
};

