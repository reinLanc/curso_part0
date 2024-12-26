import { useNotification } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      dispatch({ type: 'SHOW', payload: `Anecdote "${newAnecdote.content}" added!` })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    },
    onError: () => {
      dispatch({ type: 'SHOW', payload: 'Too short anecdote, must have 5 characters length or more' })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({ type: 'SHOW', payload: 'Anecdote must have at least 5 characters!' })
      setTimeout(() => dispatch({ type: 'HIDE' }), 5000)
      return
    }
    createAnecdoteMutation.mutate({ content, votes: 0 })
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm
