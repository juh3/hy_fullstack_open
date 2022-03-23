const OnSearch = (props) => {
  return(
    <form onSubmit = {props.handleSearch}>
      <div>
        find countries <input
        value = {props.search}
        onChange = {props.handleSearch}
        placeholder = "Type a country..."
        />
      </div> 
    </form>
  )
}

export default OnSearch; 