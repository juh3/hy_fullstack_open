import { createSlice } from '@reduxjs/toolkit'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = asObject(action.payload)
      state.push(
        content
      )
    },

    upvote(state, action) {
    
      const id = action.payload

      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map( anecdote => 
        anecdote.id !== id ? anecdote : updatedAnecdote)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { createAnecdote, upvote, appendAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer