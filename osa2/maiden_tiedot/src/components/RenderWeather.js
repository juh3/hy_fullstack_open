

const RenderWeather = ({weatherData}) =>{
  var iconind = ""
  var temperature_K  = weatherData?.main?.temp
  var temperature_C = temperature_K - 273.15
  var temperature_C_clean = parseFloat(temperature_C).toFixed(1) 
  const windspeed = weatherData?.wind?.speed
  var iconid = "10d"
  try{
   var iconid = weatherData?.weather[0].icon
  } catch (TypeError){
    return(
      <p> Fetchind data</p>
    )
  }
  
  
  return(
    <div>
      <p> <strong>temperature</strong> {temperature_C_clean} Celsius </p>
      <img src = {"http://openweathermap.org/img/wn/"+iconid+"@2x.png"}/>
      <p> wind {windspeed} m/s </p>
    </div>
  )


}

export default RenderWeather;