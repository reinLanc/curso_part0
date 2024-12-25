import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import {
  clearNotification,
  setNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteService.createAnecdote(content).then((newAnecdote) => {
      dispatch(addAnecdote(newAnecdote))
      dispatch(
        setNotification(`You have created this anecdote: "${content}"!`)
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    })
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdote" type="text" />
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}
export default AnecdoteForm
