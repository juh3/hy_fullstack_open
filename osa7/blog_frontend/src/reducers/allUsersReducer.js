
import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'


const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setUserlist( state, action) {
      return action.payload
    },

  }

})


export const initializeUserlist = () => {
  return async dispatch => {
    const users = await userService.getUserList()
    console.log(users,'in reducer')
    dispatch(setUserlist(users))
  }
}

export const { setUserlist } = allUsersSlice.actions
export default allUsersSlice.reducer