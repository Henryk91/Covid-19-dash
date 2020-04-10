import React, {Component} from 'react';
// import ExpandSvg from './Expand-svg';

export default class LeftInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCases: 0,
      countries: props && props.length > 0 ?  props : null
    };
    this.countCases = this.countCases.bind(this)
    this.createList = this.createList.bind(this)
  }

  countCases(data) {
    if(!data) return
    let total = 0;
    data.forEach((country) => {
      total += country.cases;
    });
    return total
  }

  createList = (data) => {
    if(!data) return;
    let ret = data.map((country) => {
      return (
        <div className="left-list-item" key={ country.cases + ' ' + country.country}>
          <p className="color-red">{Number(country.cases).toLocaleString()} </p>
          <p>{country.country}</p>
        </div>
      );
    });
    return ret;
  };

  render() {
    
    const { countries } = this.props;
    const totalCases = this.countCases(countries);

    const list = this.createList(countries);
    const lastUpdated = countries && countries[0] ? new Date(countries[0].updated).toLocaleString() : null;
    return (
      <div className="left-container">
        <div className="left-list-total grey-border">
          <h3>Total Confirmed</h3>
          <h1 className="big-number">{Number(totalCases).toLocaleString()}</h1>
        </div>
        <div className="grey-border list-parent1">
          <div className="left-list-title">
             {/* <ExpandSvg /> */} 
            <p>Confirmed Cases by</p>
            <p>Country/Region/Sovereignty</p>
          </div>
          <div className="left-list-container">{list}</div>
        </div>
        <div className="list-toggle">
          {/* <div className="grey-border filter-button selected">V1</div>
          <div className="grey-border filter-button">V2</div>
          <div className="grey-border filter-button">V3</div> */}
        </div>
        <div className="grey-border left-list-footer">
          <p id="last-date-title">Last Updated at (D/M/YYYY)</p>
          <p className="bold" id="last-date">
            {lastUpdated}
          </p>
        </div>
      </div>
    );
  }
}
