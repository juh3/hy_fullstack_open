import Weather from "./Weather"
const CountryInfo = ({country}) =>{
  console.log(country)
  console.log("Trying to give info on one country")
  console.log("Country's languages", country.languages)
  console.log(country.flags)
  return(
    <div>
      <h1> {country.name.common} </h1>
        <p> capital {country.capital} </p>
        <p> area {country.area}</p>
      <h3> languages:</h3>
    
      <ul className = "second-ul">
         {Object.keys(country.languages).map( key =>
           <li key = {key}>
             {country.languages[key]}
            </li>
         )}
        </ul> 
      <img src = {country.flags.png}/> 

      <Weather capital = {country.capital[0]}/>
    </div>
    


  
  ) 

}

export default CountryInfo;