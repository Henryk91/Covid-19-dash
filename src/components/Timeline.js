import React from 'react';
import { VegaLite } from 'react-vega';
import { getTimeData } from '../services/index'
import { TimeChart } from './vega/spec1'

export default class TimelineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeData: null,
      data: {myData: []},
      spec: TimeChart,
      selectedFilter: 'cases'
    };
  }

  componentDidMount() {
    getTimeData(done => {
      this.setState({ data: { myData: [...done.data]}, timeData: {data: done.data} });
        this.filterChart('cases');
    });
  }

  filterChart(name){
    let { timeData } = this.state;
    if(!timeData) return

    let days = timeData.data.map((day) => day = new Date(day.date).toDateString());
    days = days.filter((v, i, a) => a.findIndex(val => val === v) === i);

    let total = 0
    days = days.map(date => {

      let count = 0;
      timeData.data.forEach(dayData => {
        if(new Date(dayData.date).toDateString() === date){
          if(dayData[name]) count += Number(dayData[name]);
        }
      });

      total = count;
      return {date: new Date(date), count: total}
    });

    this.setState({ data: { myData: [...days] } , selectedFilter: name});
  }

  isSelected(name){
    const {selectedFilter} = this.state
    if(selectedFilter === name) return 'selected'
    return;
  }

  render() {
    const { data, spec } = this.state;
    return (
      <div id="chart-box">
        <div id="chart-inner-box">       
        <VegaLite data={data} spec={spec}/>
        <div className="map-toggle">
            <div className={`grey-border filter-button map-toggle-left ${this.isSelected('cases')}`} onClick={() => {this.filterChart('cases')}}>Cases</div>
            <div className={`grey-border filter-button ${this.isSelected('recovered')}`} onClick={() => {this.filterChart('recovered')}}>Recovered</div>
            <div className ={`grey-border filter-button ${this.isSelected('deaths')}`} onClick={() => {this.filterChart('deaths')}}>Deaths</div>
          </div>
          </div>
      </div>
    );
  }
}