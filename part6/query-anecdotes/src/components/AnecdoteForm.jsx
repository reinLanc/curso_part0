import { useNotification, useNotificationMessage } from '../NotificationContext'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../request'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notify = useNotificationMessage()

  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      notify(`Anecdote "${newAnecdote.content}" added!`)
    },
    onError: (error) => {
      notify(error.response.data.error)
    },
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
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
