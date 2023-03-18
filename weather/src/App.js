import {useEffect, useState} from 'react';

import { React } from 'react';
import './App.css';
import iconList from './data/iconList'

function App() {
  const [city, setCity] = useState('');
  const [imgWeather, setImgWeather] = useState('');
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    async function getData() {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ac08f7fb25d37c158c42861d3962f057
      `);
      const json = await response.json();
      setWeatherData(json);
      
    }
    if (city) {
      getData();
    }
  }, [city])

  
  const handleChange = (e) => {
    setCity(e.target.value)
  }
  
  const responseWeatherToUser = (weatherData) ? (
    <div>
      <p>Temperature: {weatherData.main.temp} °C </p>
      <p>Feels like: {weatherData.main.feels_like} °C </p>
      <p>Weather: {weatherData.weather[0].main} </p>
  </div>
  ) : null;
  
  // if (weatherData.weather[0].main) {
  //   for (let el in iconList) {
  //     if (el.type === weatherData.weather[0].main) {
  //       setImgWeather(el.img)
  //     }
  //   }
  // }

  return (
    <div className="App">
        <p>Weather Application</p>
        {/* Form */}
        <input
          value={city}
          onChange = {handleChange}
          type = 'text'
          placeholder='enter a city here'
        ></input>

        {/* Response */}
        <div>
            {/* {weatherData && (
              <div>
                  <p>Temperature: {weatherData.main.temp} °C </p>
                  <p>Feels like: {weatherData.main.feels_like} °C </p>
                  <p>Weather: {weatherData.weather[0].main} </p>
              </div>
            )} */}
            {responseWeatherToUser }

          {/* <img src={imgWeather} alt='icon'/> */}
        </div>
    </div>
  );
}

export default App;
