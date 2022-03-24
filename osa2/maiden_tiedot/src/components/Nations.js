import CountryInfo from './CountryInfo.js'
import Clickandsee from './Clickandsee.js'
import Weather from './Weather.js'

const Nations = ({search, dataCountries, handleSearch}) =>{
  const lengthofsearch = search.length
  if (lengthofsearch === 0){
    return(
      <p> No search done</p>
    )
  }

  const datafilter = dataCountries.filter(country => 
    country.name.common.toLowerCase().includes(search.toLowerCase())
    )   
   
  if (datafilter.length>10){
    return(
      <p>Too many matches, please specify</p>
    )
  }
  if (datafilter.length === 0){
    return(
      <p> No matches, try a gain</p>
    )
  }
  if (datafilter.length === 1){ 
    return(
      <div>
        <CountryInfo country = {datafilter[0]}/>
      </div>
    )
  }
  if (datafilter.length < 10){
    return(
    <Clickandsee datafilter = {datafilter} handleSearch = {handleSearch} />
    )
  }
}
export default Nations;