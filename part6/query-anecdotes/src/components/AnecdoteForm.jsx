import { useNotification, useNotificationMessage } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { dispatch } = useNotification()
  const notify = useNotificationMessage()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      notify(`Anecdote "${newAnecdote.content}" added!`)
    },
    onError: (error) => {
      notify(error.response.data)
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
