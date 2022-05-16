import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

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
    }
  }



})

export const { setBlogs, appendBlog } = blogSlice.actions

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

export default blogSlice.reducer