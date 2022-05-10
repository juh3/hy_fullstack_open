import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const appliedfilter = useSelector(state => state.filters).content
  const anecdotes = useSelector(state => state.anecdotes).filter(anecdote => anecdote.content.toLowerCase().includes(appliedfilter.toLowerCase()))


  const vote = (id) => {
    dispatch(upvote(id))
    const anecdoteVoted = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`you voted ${anecdoteVoted.content}`))
    setTimeout( () => {
      dispatch(removeNotification())
    },5000)
  }


  return(
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}
export default AnecdoteList