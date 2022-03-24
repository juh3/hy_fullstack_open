
const Clickandsee = ({datafilter, handleSearch}) => {
  return(
    <div>
      <ul className = "first-ul">
        {datafilter.map(country =>
        <li key = {country.name.common}>
          {country.name.common}
          <button type = "button" value = {country.name.common} onClick = {handleSearch}> show info </button>
          </li>
        )}
        
      </ul>
    </div>
  )
}

export default Clickandsee;