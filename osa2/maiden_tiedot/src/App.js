import {useState, useEffect} from 'react'
import axios from 'axios'
import Style from './Style.css'
import Nations from './components/Nations.js'
import OnSearch from './components/onSearch'


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

  

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  
  return(
    <div>
      <OnSearch 
        handleSearch = {(event) => handleSearch(event)} 
        namesearch = {search} 
      />

      <ul>
        <Nations search = {search} dataCountries = {dataCountries} handleSearch = {handleSearch}/>
      </ul>
    </div>


  )
}

export default App;