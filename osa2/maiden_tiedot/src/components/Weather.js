import axios from 'axios'
import { useState, useEffect } from 'react'
import RenderWeather from './RenderWeather'

const Weather = ({capital}) =>{
  const [weatherData,setWeatherdata] = useState()
 
  console.log("This is the capital", capital)
  const api = "http://api.openweathermap.org/data/2.5/weather?q="+capital+`&appid=`+process.env.REACT_APP_API_KEY
  
  const hook2 = () => {
    axios
    .get(api)
    .then(response =>{
      setWeatherdata(response.data)
    })
  }

  useEffect(hook2,[])


  console.log(weatherData)

  if(weatherData === null){
    return(
      <p> No weather found </p>
    )
  }

  return(
    <RenderWeather weatherData = {weatherData}/>
  )
}
  


export default Weather;