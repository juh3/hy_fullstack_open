import { useState } from 'react'
import Signin from './Signin'
import { useDispatch } from 'react-redux'
import { initializeUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword]= useState('')

  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)

  }

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(initializeUser(username, password))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }
  return(
    <div>
      <div style = {hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}> log in </button>
      </div>

      <div style = {showWhenVisible}>
        <Signin
          handlePasswordChange = {(event) => handlePasswordChange(event)}
          handleUsernameChange = {(event) => handleUsernameChange(event)}
          handleLogin = {(event) => handleLogin(event)}
          password = {password}
          username = {username}
        />
        <button onClick={() => setLoginVisible(false)}> cancel </button>
      </div>
    </div>
  )
}

export default LoginForm