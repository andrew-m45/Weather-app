import { useState } from "react";


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState({});

  // get weather data
  const getWeather = e => {
    if (e.key === "Enter") {
      // fetch weather data
      fetch(`${process.env.REACT_APP_API_BASE}weather?q=${searchTerm}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setSearchTerm('');
          setWeather(data);
        })
        .catch(err => console.log(err.message))
    }
  }

  // return current date 
  const getCurrentDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }


  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>

        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Enter a City/State..."
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyPress={getWeather}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-container">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{getCurrentDate(new Date())}</div>
            </div>

            <div className="weather-container">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
