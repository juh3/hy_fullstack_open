import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`you added ${anecdote}`, 5)
  }

  return(
    <div>    
      <h2>create new</h2>
      <form onSubmit = {addAnecdote}>
        <div><input name ="anecdote" /></div>
        <button>create</button>
      </form>
    </div>

  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  removeNotification
}

const ConnectedAnecdoteForms = connect( null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForms