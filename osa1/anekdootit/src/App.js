import { setSelectionRange } from '@testing-library/user-event/dist/utils'
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0) // The amount of votes
  const n = anecdotes.length
  const [points, setPoints] = useState(Array(n).fill(0)) // Registry of votes
  const [mostVotes,setMostvotes] = useState(0)
  const handleClick = () => {
    const value = Math.floor(Math.random()*anecdotes.length)
    setVote(points[value])
    setSelected(value)

  }

  const handleVote = () => {
    const copy = points
    copy[selected] +=1
    const amount = copy[selected]
    setVote(amount)
    setPoints(copy)

    const index = Math.max(points)
    index = points.indexOf(index)
    setMostvotes(anecdotes[index])
  }

  return (
    <div>
      <h1> Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p> has {points[selected]} votes</p>
      <button onClick = {handleVote}>vote</button>
      <button onClick = {handleClick}>next anecdote</button>

      <h1>Anecdote with the most votes</h1>
      <p> {anecdotes[mostVotes]}</p>
      <p> has {points[mostVotes]} votes </p>
      </div>
  )
}

export default App