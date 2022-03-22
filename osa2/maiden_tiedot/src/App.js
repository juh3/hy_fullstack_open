import {useState, useEffect} from 'react'
import axios from 'axios'

const Search = (props) => {
  return(
    <form onSubmit = {props.handleSearch}>
      <div>
        find countries <input
        value = {props.addSearch}
        onChange = {props.handleSearch}
        />
      </div> 
    </form>
      )
}

const Filter = (props) => {

  return(
    
  )

}

function App() {
  const [dataCountries,setData] = useState([])
  const [newSearch,setSearch] = useState([" "])

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

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  const addSearch = (event) =>{
    event.preventDefault()

  }

  const filtered =! newSearch
    ?
    : 


  return(
    <div>
      <Search handleSearch = {(event) => handleSearch(event)} 
        search = {newSearch} 
      />
      <Filter search = {newSearch}
              countries = {dataCountries} 
      />
    </div>
  )
}

export default App;
