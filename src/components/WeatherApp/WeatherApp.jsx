import React, { useEffect, useState } from 'react';
import './style.css';

import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png'; 
import drizzle from '../assets/drizzle.png'; 
import humidityIcon from '../assets/humidity.png'; 
import rain from '../assets/rain.png'; 
import searchIcon from '../assets/search.png'; 
import snow from '../assets/snow.png'; 
import windIcon from '../assets/wind.png'; 
import axios from 'axios';

const WeatherApp = () => {
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: cloud,
    });

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleCitySearch = () => {
        if (name.trim() === '') {
            setLoader(true);
            return;
        }

        const apiKey = process.env.REACT_APP_API_KEY;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`;

        axios.get(apiURL)
            .then((response) => {
                const weatherData = response.data;
                const mainWeather = weatherData.weather[0].main;
                const weatherImage = getWeatherImage(mainWeather);

                setData({
                    celcius: weatherData.main.temp,
                    name: weatherData.name,
                    humidity: weatherData.main.humidity,
                    speed: weatherData.wind.speed,
                    image: weatherImage,
                });

                setError('');
                setLoader(false);
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    setError('Invalid city name');
                } else {
                    setError('An error occurred');
                }
                setLoader(true);
            });
    };

    const getWeatherImage = (weatherType) => {
        switch (weatherType) {
            case 'Clouds':
                return cloud;
            case 'Rain':
                return rain;
            case 'Drizzle':
                return drizzle;
            case 'Mist':
                return snow;
            case 'Clear':
                return clear;
            default:
                return cloud;
        }
    };

    return (
        <div className='container'>
            <div className="top-bar">
                <input
                    type="text"
                    className="city-input"
                    placeholder="city"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="search-icon" onClick={handleCitySearch}>
                    <img src={searchIcon} alt="search icon" />
                </div>
            </div>
            {error && <div className="error"><span className="error-icon">&#9888;</span>{error}</div>}
            {loader ? (
                <div className='loader'>Please Enter Your City..</div>
            ) : (
                <>
                    <div className="weather-image">
                        <img src={data.image} alt="weather" />
                    </div>
                    <div className="weather-temp">{Math.round(data.celcius)}°C</div>
                    <div className="weather-location">{data.name}</div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidityIcon} alt="humidity" />
                            <div className="data">
                                <div className="humidity-percent">{data.humidity}%</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={windIcon} alt="wind speed" />
                            <div className="data">
                                <div className="humidity-percent">{Math.round(data.speed)} km/h</div>
                                <div className="text">Wind Speed</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
