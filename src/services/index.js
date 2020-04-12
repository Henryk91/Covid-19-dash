export function getCountries(next) {
    fetch('https://henryk91-note.herokuapp.com/api/dash-data/countries')
      .then((res) =>  res.json())
      .then((data) => {
        next(data)
      })
      .catch((error) => {
        console.log('Error:', error);
        next(error);
      });
  }
export function getTimeData(next) {
    fetch('https://henryk91-note.herokuapp.com/api/dash-data/map-data')
      .then((res) =>  res.json())
      .then((data) => {
        next(data)
      })
      .catch((error) => {
        console.log('Error:', error);
        next(error);
      });
  }

function processHistoriaclData(data){
  const cases = data.cases;
  const deaths = data.deaths;
  const recovered = data.recovered;
  const keys = Object.keys(cases);
  
  const parsed = keys.map(key => {

    return {
      date: key,
      cases: cases[key],
      deaths: deaths[key],
      recovered: recovered[key]
    }
    
  })
  // console.log('parsed',parsed);
  // console.log('data',data);
  return {data: parsed};
}
export function getHistoricalTimeData(next) {
    fetch('https://henryk91-note.herokuapp.com/api/dash-data/historical')
      .then((res) =>  res.json())
      .then((data) => {
        next(processHistoriaclData(data))
      })
      .catch((error) => {
        console.log('Error:', error);
        next(error);
      });
  }

