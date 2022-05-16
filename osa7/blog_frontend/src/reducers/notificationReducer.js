import { createSlice } from '@reduxjs/toolkit'
let delay = 0

const initialState = { message: null }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    seeNotification(state, action) {
      console.log(action)
      const notification = action.payload
      state.message = notification
    },

    removeNotification(state) {
      state.message = null
    }
  }

})


export const { seeNotification, removeNotification } = notificationSlice.actions

export const setNotification = (notification, timer) => {
  return async dispatch => {
    console.log(timer)
    console.log(delay)
    clearTimeout(delay)
    delay = setTimeout( () => {
      dispatch(removeNotification())
    }, timer*1000)

    dispatch(seeNotification(notification))
  }
}
export default notificationSlice.reducer