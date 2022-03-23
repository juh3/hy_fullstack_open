import {useState, useEffect} from 'react'
import axios from 'axios'
import Style from './Style.css'

const OnSearch = (props) => {
  return(
    <form onSubmit = {props.handleSearch}>
      <div>
        find countries <input
        value = {props.search}
        onChange = {props.handleSearch}
        placeholder = "Type a country..."
        />
      </div> 
    </form>
  )
}

const CountryInfo = (props) =>{
  console.log("Trying to give info on one country")
  console.log("Country's languages", props.info.languages)
  console.log(props)
  console.log(props.info.flags)
  return(
    <div>
      <h1> {props.info.name.common} </h1>
        <p> capital {props.info.capital} </p>
        <p> area {props.info.area}</p>
      <h3> languages:</h3>
    
      <ul class = "second-ul">
         {Object.keys(props.info.languages).map( key =>
           <li key = {key}>
             {props.info.languages[key]}
            </li>
         )}
        </ul> 
      <img src = {props.info.flags.png}/> 
    </div>


  
  ) 
}

const App = () => {
  const [dataCountries,setData] = useState([])
  const [search,setSearch] = useState([])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
      }
  useEffect(hook,[])


  const showData = () =>{
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
    if (datafilter.length=== 0){
      return(
        <p> No matches, try a gain</p>
      )
    }
    if (datafilter.length === 1){
      return(
        <div>
          <CountryInfo info = {datafilter[0]}/>
        </div>
      )
    }
    else{
      return(
        <ul class = "first-ul">
          {datafilter.map(country =>
          <li key = {country.name.common}>
            {country.name.common}
            </li>
          )}
        </ul>
      )
    }
  }
        
      

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const addSearch = (event) =>{
    event.preventDefault()
  }
 
  return(
    <div>
      <OnSearch 
        handleSearch = {(event) => handleSearch(event)} 
        namesearch = {search} 
      />

      <ul>
        {showData()}
      </ul>
    </div>


  )
}

export default App;