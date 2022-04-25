import PropTypes from 'prop-types'

const Signin = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {

  return(
    <form onSubmit ={handleLogin}>
      <div>
        username: <input
          value = {username}
          placeholder = "input your username"
          onChange = {handleUsernameChange}
        />
      </div>

      <div>
        password: <input
          value = {password}
          placeholder = "input your password"
          onChange = {handlePasswordChange}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}
export default Signin

Signin.propTypes = {
  handleLogin : PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}