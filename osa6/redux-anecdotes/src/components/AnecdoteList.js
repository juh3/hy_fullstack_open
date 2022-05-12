import { connect } from 'react-redux'
import { handleVoting } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  /*const appliedfilter = useSelector(state => state.filters).content
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote => anecdote.content.toLowerCase()
      .includes(appliedfilter.toLowerCase()))*/


  const vote = (id) => {
    const anecdoteVoted = props.anecdotes
      .find(anecdote => anecdote.id === id)
    const anecdoteObject = {...anecdoteVoted, votes: anecdoteVoted.votes + 1 }
    props.handleVoting(id,anecdoteObject)
    props.setNotification(`you voted ${anecdoteVoted.content}`,5)
    
  }


  return(
    <div>
      {props.anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
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
const mapStateToProps = (state) => {
  return{
    anecdotes:  state.anecdotes
    .filter(anecdote => anecdote.content.toLowerCase()
      .includes(state.filters.content.toLowerCase()))
  }
}

const mapDispatchToProps = {
  handleVoting,
  setNotification
}

const ConnectedAnecdotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdotes