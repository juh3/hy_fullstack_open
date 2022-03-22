import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PrintBook from './components/PrintBook'
import axios from 'axios'
import {useState, useEffect} from 'react'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[newSearch, setSearch] = useState('')


  const hook = () => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response =>{
        console.log('promise fullfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook,[])

  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)

  }

  

  const addName=(event) =>{
    event.preventDefault()
    
    if(persons.find(person =>person.name === newName)){
      alert(`${newName} is already in the phonebook`)
    }

    else{
    // creating a nameObject with the newName
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons([...persons,nameObject])
      //reset the value of NewName, ready for a new name
    }
   resetForm()
  }

  const resetForm = () => {
    setNewName(" ")
    setNewNumber(" ")
  }
  
  const filtered = !newSearch
    ? persons
    : persons.filter((persons) =>
        persons.name.toLowerCase().includes(newSearch.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2> 

      <Filter 
        nameValue = {newSearch}
        handleSearch = {(event) => handleSearch(event)}
        />

      <h2> add a new</h2>

      <PersonForm
        nameValue = {newName}
        numberValue = {newNumber}
        onSubmit = {(event) => {addName(event)}}
        handleNameChange = {(event) => handleNameChange(event)}
        handleNumberChange = {(event) => handleNumberChange(event)}
        />

      <h2>Numbers</h2>

      <PrintBook 
        persons = {filtered}
        />

      
    </div>
  )

}

export default App;