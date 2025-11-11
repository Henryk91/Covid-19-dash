import React from 'react';
import { VegaLite } from 'react-vega';
import { getHistoricalTimeData } from '../services/index';
import { TimeChart } from './vega/spec1';

export default class TimelineChart extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      timeData: null,
      data: { myData: [] },
      spec: TimeChart,
      selectedFilter: 'cases',
      historical: null,
      hasLoadedHistorical: false
    };
  }

  parseDate( value ) {
    if ( !value ) return null;
    const directDate = new Date( value );
    if ( !Number.isNaN( directDate.getTime())) {
      return directDate;
    }

    const parts = String( value ).split( '/' );
    if ( parts.length === 3 ) {
      const [month, day, yearPart] = parts.map(( part ) => Number( part ));
      if ([month, day, yearPart].every(( num ) => Number.isFinite( num ))) {
        const fullYear = yearPart < 100 ? 2000 + yearPart : yearPart;
        const utcDate = new Date( Date.UTC( fullYear, month - 1, day ));
        if ( !Number.isNaN( utcDate.getTime())) {
          return utcDate;
        }
      }
    }
    return null;
  }

  getNumericValue( value, fallback = 0 ) {
    if ( value === null || value === undefined ) return fallback;
    const normalized = typeof value === 'string' ? value.replace( /,/g, '' ).trim() : value;
    const numericValue = Number( normalized );
    if ( Number.isFinite( numericValue )) {
      return numericValue;
    }
    return fallback;
  }

  componentDidMount() {
    getHistoricalTimeData(( done ) => {
      const historicalData = Array.isArray( done?.data ) ? done.data : [];
      this.setState({ historical: { data: historicalData }, hasLoadedHistorical: true }, () => {
        if ( historicalData.length ) {
          this.filterChart( 'cases' );
        }
      });
    });
  }

  filterChart( name ) {
    const { historical } = this.state;
    const historicalData = historical && Array.isArray( historical.data ) ? historical.data : null;
    if ( !historicalData || !historicalData.length ) return;
    let days = historicalData
      .map(( day ) => {
        const parsedDate = this.parseDate( day.date );
        if ( !parsedDate ) {
          return null;
        }
        const dateValue = parsedDate.getTime();
        if ( !Number.isFinite( dateValue )) {
          return null;
        }
        const countValue = this.getNumericValue( day[name], null );
        if ( !Number.isFinite( countValue )) {
          return null;
        }
        return {
          date: dateValue,
          count: countValue
        };
      })
      .filter( Boolean );
    days = days.filter(( entry ) => entry && Number.isFinite( entry.date ) && Number.isFinite( entry.count ));

    if ( !days.length ) {
      this.setState({ data: { myData: [] }, selectedFilter: name });
      return;
    }

    const normalizedDays = days.map(({ date, count }) => ({
      date: new Date( date ).toISOString(),
      count
    }));

    this.setState({ data: { myData: normalizedDays }, selectedFilter: name });
  }
  timeDataFilterChart( name ) {
    const { timeData } = this.state;
    const timeSeries = timeData && Array.isArray( timeData.data ) ? timeData.data : null;
    if ( !timeSeries || !timeSeries.length ) return;
    let days = timeSeries
      .map(( day ) => {
        const parsed = this.parseDate( day.date );
        if ( !parsed ) return null;
        const time = parsed.getTime();
        return Number.isFinite( time ) ? time : null;
      })
      .filter(( time ) => Number.isFinite( time ));
    const uniqueDaysMap = new Map( days.map(( time ) => [time, time]));
    days = Array.from( uniqueDaysMap.values());

    let total = 0;
    days = days.map(( date ) => {
      let count = 0;
      timeSeries.forEach(( dayData ) => {
        const parsed = this.parseDate( dayData.date );
        if ( parsed && parsed.getTime() === date ) {
          const value = this.getNumericValue( dayData[name], null );
          if ( Number.isFinite( value )) {
            count += value;
          }
        }
      });

      total = Number.isFinite( count ) ? count : 0;
      return {
        date: new Date( date ).toISOString(),
        count: total
      };
    });

    this.setState({ data: { myData: [...days] }, selectedFilter: name });
  }

  isSelected( name ) {
    const { selectedFilter } = this.state;
    if ( selectedFilter === name ) return 'selected';
    return;
  }

  render() {
    const { data, spec, hasLoadedHistorical } = this.state;
    const hasData = data && Array.isArray( data.myData ) && data.myData.length > 0;
    const emptyMessage = hasLoadedHistorical ? 'No chart data available' : 'Loading chart...';
    return (
      <div id="chart-box">
        <div id="chart-inner-box">
          { hasData ? <VegaLite data={data} spec={spec} /> : <p className="map-loading">{ emptyMessage }</p> }
          <div className="map-toggle">
            <button
              type="button"
              className={`grey-border filter-button map-toggle-left ${this.isSelected( 'cases' )}`}
              onClick={() => {
                this.filterChart( 'cases' );
              }}
            >
              Cases
            </button>
            <button
              type="button"
              className={`grey-border filter-button ${this.isSelected( 'recovered' )}`}
              onClick={() => {
                this.filterChart( 'recovered' );
              }}
            >
              Recovered
            </button>
            <button
              type="button"
              className={`grey-border filter-button ${this.isSelected( 'deaths' )}`}
              onClick={() => {
                this.filterChart( 'deaths' );
              }}
            >
              Deaths
            </button>
          </div>
        </div>
      </div>
    );
  }
}
