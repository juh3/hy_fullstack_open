
const PrintBook = (props) =>{
  return(
    <ul>
        
      {props.persons.map(person => (
        <li key = {person.name}>
          {person.name} {person.number}
          </li>
       ))}
    </ul>
  )
}


export default PrintBook;
    