import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
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
  }
})
/*export const upvote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const createAnecdote = (anecdote) => {
  const newAnecdote = asObject(anecdote)
  return {
    type: 'ADD',
    data: newAnecdote,
    }
  
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case "VOTE": {
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.data.id)
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return(
        state.map( anecdote => 
          anecdote.id !== action.data.id ? anecdote : updatedAnecdote)
      )

    }

    case "ADD": {
      return [ ...state, action.data]
    }
  }
  return state
}
*/
export const { createAnecdote, upvote } = anecdoteSlice.actions
export default anecdoteSlice.reducer