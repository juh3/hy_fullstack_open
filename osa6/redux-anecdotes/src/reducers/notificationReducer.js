import { createSlice } from '@reduxjs/toolkit'


const initialState = {message: null}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      state.message = notification
      
    },

    removeNotification(state, action) {
      state.message = null
    }
  }

})


export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer