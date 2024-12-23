import { useSelector, useDispatch } from 'react-redux'
import { addAnecdote, voteAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    dispatch(addAnecdote(content))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
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
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" type="text"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App