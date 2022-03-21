import { useState } from 'react'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')


  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addName=(event) =>{
    event.preventDefault()
    
    if(persons.find(person =>person.name === newName)){
      alert(`${newName} is already in the phonebook`)
      setNewName('')
    }

    else{
    // creating a nameObject with the newName
    const nameObject = {
      name: newName,
    }
    setPersons([...persons,nameObject])
    //reset the value of NewName, ready for a new name
    setNewName('')
  }
  }

  return (
    <div>
      <h2>Phonebook</h2>  
      <form onSubmit = {addName}>
        <div>
          name: <input
          value = {newName} 
          onChange = {handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => (
          <p key = {person.name}>
              {person.name}
          </p>
        ))}
      </ul>
      
    </div>
  )

}

export default App