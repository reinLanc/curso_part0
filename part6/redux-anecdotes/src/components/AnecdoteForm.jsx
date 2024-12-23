import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <form onSubmit={create}>
      <div>
        <input name="anecdote" type="text"/>
        <button type="submit">Create</button>
      </div>
    </form>
  )
}
export default AnecdoteForm