import axios from 'axios'
import { useState, useEffect } from 'react'
import RenderWeather from './RenderWeather'

const Weather = ({capital}) =>{
  const [weatherData,setWeatherdata] = useState()
  console.log(process.env.REACT_APP_KEY)
  const API_KEY =`${process.env.REACT_APP_API_KEY_YT}`
  console.log("This is the capital", capital)
  const api = "http://api.openweathermap.org/data/2.5/weather?q="+capital+`&appid=+`+API_KEY
  
  const hook2 = () => {
    axios
    .get(api)
    .then(response =>{
      setWeatherdata(response.data)
    })
  }

  useEffect(hook2,[])


  console.log(weatherData)



  return(
    <RenderWeather weatherData = {weatherData}/>
  )
}
  


export default Weather;