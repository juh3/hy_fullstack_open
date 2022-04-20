
const Signin = (props) => {
  return(
    <form onSubmit ={props.onSignin}>
      <div>
      username: <input
        value = {props.newUsername} 
        placeholder = "input your username"
        onChange = {props.handleUsernameChange}
        />
      </div>

      <div>
      name: <input
        value = {props.newName} 
        placeholder = "input your name"
        onChange = {props.handleNameChange}
        />
      </div>

      <div>
      password: <input
        value = {props.newPassword} 
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