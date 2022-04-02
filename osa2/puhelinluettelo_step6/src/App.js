import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import PrintBook from './components/PrintBook'
import {useState, useEffect} from 'react'
import personService from './services/personService'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const[newNumber, setNewNumber] = useState('')
  const[newSearch, setSearch] = useState('')
  const[notification,setNotification] = useState(null)

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
      setNotification({text:`Successfully deleted ${person.name}`,
      type:"success"})
      setTimeout(() =>{
        setNotification(null)
      },5000)
      
      
    }
  }

  const addName=(event) =>{
    event.preventDefault()
   
    
    if(persons.find(person =>person.name === newName)){
      if (window.confirm(newName+ " is already added to the phonebook, replace the old number with a new one?")){
        const person = persons.find(person => person.name === newName)
        const changedPerson = {...person, number: newNumber}
        console.log(changedPerson)
        personService
        .update(changedPerson.id,changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(dude => dude.id !== changedPerson.id ? dude : returnedPerson))
        })
        .catch((error) =>{
          setNotification({
            text: `Information for ${person.name} has already been removed from the server`,
            type: "failure"
          })
          })
          setPersons(persons.filter(n => n.id !== person.id))
          setTimeout(() =>{
            setNotification(null)
          }, 5000)

          
        
        setNotification({text:`Successfully updated phonenumber of ${person.name}`,
        type: "success"})
        setTimeout(() =>{
          setNotification(null)
        }, 5000)
        
    }
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
      setNotification({text:`Added ${newName}`,
      type: "success"})
      console.log("Trying to render a notification")
      console.log(`Added ${newName}`)
      setNewName("")
      setNewNumber("")
      setTimeout(() => {
        setNotification(null)
      },5000)
      
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
      
      <Notification message = {notification}/>

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