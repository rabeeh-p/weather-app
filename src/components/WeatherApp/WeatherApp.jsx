import React, { useEffect, useState } from 'react'
import './style.css'

import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png' 
import drizle from '../assets/drizzle.png' 
import humidity from '../assets/humidity.png' 
import rain from '../assets/rain.png' 
import search from '../assets/search.png' 
import snow from '../assets/snow.png' 
import wind from '../assets/wind.png' 
import axios from 'axios'

const WeatherApp = () => {

    let [loader,setLoader]=useState(true)

    const [data,setData]=useState({
        celcius: 10,
        name: 'london',
        humidity:10,
        speed:2,
        image:cloud
    })

    useEffect(()=>{
    },[])

    let [name,setName]=useState('')
    let [error,setError]=useState('')

    let ClickFn=()=>{
        console.log('clicked')
        if(name !=''){
            let apikey=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${process.env.REACT_APP_API_KEY}`
        axios.get(apikey)
        .then((res)=>{console.log(res.data)
            let imagePath=''
            if (res.data.weather[0].main === 'Clouds'){
                imagePath= cloud
            }else if(res.data.weather[0].main === 'Rain'){
                imagePath= rain
            }else if(res.data.weather[0].main === 'Drizzle'){
                imagePath=drizle
            }else if(res.data.weather[0].main === 'Mist'){
                imagePath=snow
            }else if(res.data.weather[0].main === 'Clear'){
                imagePath=clear
            }else{
                imagePath= cloud
            }


        setData({...data,
            celcius:res.data.main.temp,
            name:res.data.name,
            humidity:res.data.main.humidity,
            speed:res.data.wind.speed,
            image:imagePath
        })
        setError('')
        
        setLoader(false)
        })
        .catch((err)=>{
            if  (err.response && err.response.status === 404){
                setError('invalid city name')
                setLoader(true)
            }else{
                setError('')
            }
            console.log(err)})
        }else{
            setLoader(true)
        }
    }

    console.log(process.env)

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="city-input" placeholder='name of city' onChange={(e)=>{
                setName(e.target.value)
                console.log(e.target.value)
                }}  />
            <div className="search-icon" onClick={()=>{ClickFn()}} >
                <img src={search} alt="" />
            </div>
        </div>
        <div className="error">{error}</div>
        {loader? <div className='loader'>please enter your city..</div>:<><div className="weather-image">
            <img src={data.image} alt="" />
        </div>
        <div className="weather-temp">{Math.round(data.celcius)}°c</div>
        <div className="weather-location">{data.name}</div>

        <div className="data-container">
            <div className="element">
                <img src={humidity} alt="" />
                <div className="data">
                    <div className="humidity-percent">{data.humidity}%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind} alt="" />
                <div className="data">
                    <div className="humidity-percent">{Math.round(data.speed)} km/h</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div></>}
      
    </div>
  )
}

export default WeatherApp
