
const PrintBook = ({persons, handleDeletion}) =>{
  console.log("trying to print",persons)


  return(
    <ul>
        
      {persons.map(person => 
        <li key = {person.name}>
          {person.name} {person.number}
          <button type = "button" value = {person.name} onClick ={handleDeletion} > delete </button>
          </li>
       )}
    </ul>
  )
}


export default PrintBook;
