
const Signin = (props) => {
  return(
    <form onSubmit ={props.signuser}>
      <div>
      username: <input
        value = {props.username} 
        placeholder = "input your username"
        onChange = {props.handleUsernameChange}
        />
      </div>

      <div>
      password: <input
        value = {props.password} 
        placeholder = "input your password"
        onChange = {props.handlePasswordChange}
        />
      </div>
      <div>
          <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Signin;