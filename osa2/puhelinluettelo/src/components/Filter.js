const Filter = (props) => {
  return(
    <form onSubmit = {props.handleSearch}>
      <div>
        filter shown with: <input
        value = {props.newSearch}
        onChange = {props.handleSearch}
        />
      </div>
      </form>
  )
}

export default Filter;