export function getCountries(next) {
    fetch('https://note.henryk.co.za/api/dash-data/countries')
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
    fetch('https://note.henryk.co.za/api/dash-data/map-data')
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

  return {data: parsed};
}
export function getHistoricalTimeData(next) {
    fetch('https://note.henryk.co.za/api/dash-data/historical')
      .then((res) =>  res.json())
      .then((data) => {
        next(processHistoriaclData(data))
      })
      .catch((error) => {
        console.log('Error:', error);
        next(error);
      });
  }
export function logUse() {
    fetch('https://note.henryk.co.za/api/log')
      .then((res) =>  {
        console.log('Welcome to my site.');  
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

