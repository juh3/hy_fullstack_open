import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],

  reducers: {
    setBlogs( state, action) {
      return action.payload
    },

    appendBlog( state, action) {
      console.log(action)
      state.push(action.payload)
    },


    updateLike(state, action) {
      console.log(action)
      const updatedBlog = action.payload
      console.log(action.payload)
      return state.map( blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
    },

    redactBlog(state, action) {
      return state.filter(n => n.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlog, updateLike, redactBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    console.log(content)
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

export const removeBlog = (blog,user) => {
  return async dispatch => {
    try{
      blogService
        .redact(blog.id, user.token)
      dispatch(removeBlog(blog))
      dispatch(initializeBlogs())
      dispatch(setNotification(`Successfully deleted ${blog.title}`,5))
    }catch(exception){
      dispatch(setNotification('Remove failed, try again',5))
    }
  }
}


export default blogSlice.reducer