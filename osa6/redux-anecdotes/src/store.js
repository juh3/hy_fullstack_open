
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filters: filterReducer
  }
})
console.log(store.getState())



export default store