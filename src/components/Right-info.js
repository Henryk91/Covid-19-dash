import React from 'react';
// import ExpandSvg from './Expand-svg';

import TimelineChart from './Timeline';
const RightInfo = (props) => {
  let totalRecovered = 0;
  let totalDeaths = 0;

  const createDList = (data) => {
    if (!data) return;
    let ret = data.map((country) => {
      return (
        <div className="right-list-item" key={country.deaths + ' ' + country.country}>
          <p className="">
            <span className="white">{Number(country.deaths).toLocaleString()}</span> deaths
          </p>
          <p>{country.country}</p>
        </div>
      );
    });
    return ret;
  };
  const countDeaths = (data) => {
    if (!data) return;
    let total = 0;
    data.forEach((country) => {
      total += country.deaths;
    });
    totalDeaths = total;
  };
  const countRecover = (data) => {
    if (!data) return;
    let total = 0;
    data.forEach((country) => {
      total += country.recovered;
    });
    totalRecovered = total;
  };

  const createRList = (data) => {
    let ret = data.map((country) => {
      return (
        <div className="right-list-item" key={country.recovered + ' ' + country.country}>
          <p className="green">
            <span className="green">{Number(country.recovered).toLocaleString()}</span> recovered
          </p>
          <p>{country.country}</p>
        </div>
      );
    });
    return ret;
  };

  const dList = createDList(props.countries);
  const rList = createRList(props.countries);
  countDeaths(props.countries);
  countRecover(props.countries);
  return (
    <div className="right-container1">
      <div id="right-fg-2">
        <div className="right-inner-container1" id="right-inner-container1">
          <div  className="right-list-box1 grey-border">
            <div className="right-list-title">
              {/* <ExpandSvg /> */}
              <p>Total Deaths</p>
              <h1 className="big-number-right">{Number(totalDeaths).toLocaleString()}</h1>
            </div>
            <div className="right-list-container1">{dList}</div>
          </div>
          <div className="right-list-box1 grey-border">
            <div className="right-list-title">
              {/* <ExpandSvg /> */}
              <p>Total Recovered</p>
              <h1 className="big-number-right green">{Number(totalRecovered).toLocaleString()}</h1>
            </div>
            <div className="right-list-container1">{rList}</div>
          </div>
        </div>
      </div>
      <div className="grey-border1" id="right-chart">
        <TimelineChart />
      </div>
    </div>
  );
};

export default RightInfo;
