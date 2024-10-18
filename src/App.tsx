import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

export interface Root {
  city: string
  weatherAPI: WeatherApi
}

export interface WeatherApi {
  temperature: Temperature
  description: string
}

export interface Temperature {
  location: Location
  current: Current
}

export interface Location {
  name: string
  region: string
  country: string
  lat: number
  lon: number
  tz_id: string
  localtime_epoch: number
  localtime: string
}

export interface Current {
  last_updated_epoch: number
  last_updated: string
  temp_c: number
  temp_f: number
  is_day: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_degree: number
  wind_dir: string
  pressure_mb: number
  pressure_in: number
  precip_mm: number
  precip_in: number
  humidity: number
  cloud: number
  feelslike_c: number
  feelslike_f: number
  windchill_c: number
  windchill_f: number
  heatindex_c: number
  heatindex_f: number
  dewpoint_c: number
  dewpoint_f: number
  vis_km: number
  vis_miles: number
  uv: number
  gust_mph: number
  gust_kph: number
}

export interface Condition {
  text: string
  icon: string
  code: number
}


const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState<Root | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event:any) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event : any) => {
    event.preventDefault();
    setLoading(true);
    setError(null); 

    try {
      const response = await axios.get(`http://13.201.61.213:3000/api/weather/${searchTerm}`);
     
      setWeatherData(response.data);
    } catch (err) {
      console.log('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='center-screen'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter city name"
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}

      {weatherData?.weatherAPI.temperature.current.cloud !== null && (
        <div className='content'>
          <h2>Weather Information for {searchTerm}</h2>
          {/* Wrap weather details in a single parent <div> */}
          <div>
            <p>Description: {weatherData?.weatherAPI.description}</p>
            <p>Temperature: {weatherData?.weatherAPI.temperature.current.temp_c}°C</p>
            <p>Humidity: {weatherData?.weatherAPI.temperature.current.humidity}%</p>
            <p>Clouds: {weatherData?.weatherAPI.temperature.current.cloud}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
