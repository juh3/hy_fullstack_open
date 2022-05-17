
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import loginService from '../services/loginService'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'users',
  initialState: null,

  reducers: {
    setUser(state, action) {
      return action.payload
    },

    logOut() {
      return null
    }

  }
})

export const getUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const initializeUser = ( username, password ) => {
  return async dispatch => {
    console.log(username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification('Login successful',5))

    } catch (exception) {
      dispatch(setNotification('wrong credentials',5))
    }
  }
}

export const logoutuser = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch(logOut())
    dispatch(setNotification('Logged out succesfully', 5))

  }
}

export const { setUser, logOut } = userSlice.actions
export default userSlice.reducer