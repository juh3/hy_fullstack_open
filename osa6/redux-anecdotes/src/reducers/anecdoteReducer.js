import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    upvote(state, action) {
      const updatedAnecdote = action.payload
      return state.map( anecdote => 
        anecdote.content !== updatedAnecdote.content ? anecdote : updatedAnecdote)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes( state, action) {
      return action.payload
    }
  }
})

export const { upvote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const handleVoting = (id, object) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id,object)
    dispatch(upvote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer