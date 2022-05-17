import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],

  reducers: {
    setBlogs( state, action) {
      console.log(action)
      return action.payload
    },

    appendBlog( state, action) {
      console.log(action)
      state.push(action.payload)
    },


    updateLike(state, action) {
      console.log(action)
      const updatedBlog = action.payload
      return state.map( blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    }
  }
})

export const { setBlogs, appendBlog, updateLike } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    console.log(blogs)
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const upvote = ( id, blogObject ) => {
  return async dispatch => {
    const updatedBlog = await blogService
      .like(id, blogObject )
    dispatch(updateLike(updatedBlog))
    dispatch(setNotification( `You liked ${blogObject.title}`, 5))
      .catch( error => {
        console.log(error)
        dispatch(setNotification('Encountered an issue, your like wasnt reqistered',5))
      })
  }
}

export default blogSlice.reducer