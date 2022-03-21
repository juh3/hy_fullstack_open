import { useState } from 'react'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PrintBook from './components/PrintBook'
  
 
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-1231122'},
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[newSearch, setSearch] = useState('')

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
    setNewName("")
    setNewNumber("")
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