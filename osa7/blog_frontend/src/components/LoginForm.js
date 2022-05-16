import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import Signin from './Signin'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const [loginVisible, setLoginVisible] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword]= useState('')
  const [user, setUser] = useState(null)
  console.log(user)
  const dispatch = useDispatch()

  const handlePasswordChange = (event) => {
    console.log(event.target.value)
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)

  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification('Login successful',5))


      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification('wrong credentials',5))
    }
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