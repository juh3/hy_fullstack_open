import {useState, useEffect} from 'react'
import axios from 'axios'

const Search = (props) => {
  return(
    <form onSubmit = {props.handleSearch}>
      <div>
        find countries <input
        value = {props.addSearch}
        placeholder = 'Search for a country'
        onChange = {props.handleSearch}
        />
      </div> 
    </form>
  )
}

function App() {
  const [dataCountries,setData] = useState([' '])
  const [newSearch,setSearch] = useState([' '])

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setData(response.data)
      })
      }
  useEffect(hook,[])
  console.log(dataCountries)
  console.log(dataCountries[0].name.common)


  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const addSearch = (event) =>{
    event.preventDefault()

  }
  
 

  return(
    <div>
      <Search handleSearch = {(event) => handleSearch(event)} 
        search = {newSearch} 
      />
     
    </div>
  )
}

export default App;
