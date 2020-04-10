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