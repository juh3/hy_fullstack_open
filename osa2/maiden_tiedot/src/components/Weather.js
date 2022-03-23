import axios from 'axios'
import { useState } from 'react'

const Weather = ({capital}) =>{
  const [weatherData,setWeatherdata] = useState([])
  console.log(capital)
  const api = "api.openweathermap.org/data/2.5/weather?="+capital+"&appid=4cbe24a96e2c79d855286d8e61c045b8"  
  axios
  .get(api)
  .then(response => {
    setWeatherdata(response.data)

  })
  console.log(weatherData)
  return(
    <div>
      <h1> Weather in {capital}</h1>
    </div>
  )
  
}

export default Weather;