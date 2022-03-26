import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PrintBook from './components/PrintBook'
import {useState, useEffect} from 'react'
import personService from './services/personService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[newSearch, setSearch] = useState('')

  console.log(persons)

  const hook = () => {
    console.log('effect')
    personService
    .getAll()
    .then(initialPersons =>{
      setPersons(initialPersons)
    })
  }

  useEffect(hook,[])

  console.log(persons)

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

  const handleDeletion = (event) =>{
    console.log("Pressed  delete button")
    console.log("Entry to be deleted",event.target.value)
    const target_id = event.target.value
    console.log(target_id)
    const person = persons.find(n => n.name === target_id)
    if (window.confirm("Delete " + person.name + " ?")){
      console.log(person.name, person.id)
      personService
      .redact(person.id)
      console.log(persons)
      const updatedpersons = persons.filter(n => n.id !== person.id)
      setPersons(updatedpersons)
      
      
    }
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
      
      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        
      })
      
      
      //reset the value of NewName, ready for a new name
    }
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
        handleDeletion = {(event) => handleDeletion(event)}
        />

      
    </div>
  )

}

export default App;