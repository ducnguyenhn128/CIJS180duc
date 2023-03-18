import {useEffect, useState} from 'react';

import { React } from 'react';
import './App.css';
import iconList from './data/iconList'

function App() {
  const [city, setCity] = useState('');
  const [imgWeather1, setImgWeather1] = useState('https://cdn-icons-png.flaticon.com/512/6974/6974833.png');
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
    setCity(e.target.value);
    for (let el in iconList) {
      if (el.type === weatherStatus) {
        setImgWeather1(el.type)
      }
    }
  }
  

  const weatherStatus = (!weatherData || weatherData.message==='city not found') ? null : weatherData.weather[0].main;

  const responseWeatherToUser = (!weatherData || weatherData.message==='city not found') ? null : (
    <div>
      <p>{weatherData.name}, {weatherData.sys.country}</p>
      <p>Temperature: {weatherData.main.temp} °C </p>
      <p>Feels like: {weatherData.main.feels_like} °C </p>
      <p>Weather: {weatherData.weather[0].main} </p>
      <img src = {imgWeather1} alt ='' width='100px' />
    </div>
  )

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
        {responseWeatherToUser }

    </div>
  );
}

export default App;
