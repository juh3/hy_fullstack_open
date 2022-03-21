import { useState } from 'react'


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

  const filtered = !newSearch
    ? persons
    : persons.filter((persons) =>
        persons.name.toLowerCase().includes(newSearch.toLowerCase())
    )

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
      number: newNumber,
    }
    setPersons([...persons,nameObject])
    //reset the value of NewName, ready for a new name
    setNewName('')
    console.log(persons)
    }
  }

  const searchName = (event) =>{

  }

  return (
    <div>
      <h2>Phonebook</h2> 


      <form onSubmit = {searchName}>
      <div>
        filter shown with: <input
        value = {newSearch}
        onChange = {handleSearch}
        />
      </div>
      </form>

      <h2> add a new</h2>

      <form onSubmit = {addName}>
        <div>
          name: <input
          value = {newName} 
          onChange = {handleNameChange}
          />
        </div>

        <div>
          number: <input
          value = {newNumber}
          onChange = {handleNumberChange}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>
      <h2>Numbers</h2>
      <ul>
        //map over the filtered array and display the appropriate list of people.
        {filtered.map(person => (
          <p key = {person.name}>
              {person.name} {person.number}
          </p>
        ))}
      </ul>
      
    </div>
  )

}

export default App