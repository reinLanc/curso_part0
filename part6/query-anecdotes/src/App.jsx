import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './request'
import { useNotification, useNotificationMessage } from './NotificationContext'


const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotificationMessage()
  const { dispatch } = useNotification()
  const { data: anecdotes, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry:1
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn:({ id, votedAnecdote }) => voteAnecdote(id, votedAnecdote),
    onSuccess:(votedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes'])
      notify(`You voted for "${votedAnecdote.content}"`)
    }
  })

  if(isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if(error) {
    return <div>An anecdote service is currently unavailable</div>
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    voteAnecdoteMutation.mutate({
      id: anecdote.id,
      votedAnecdote: updatedAnecdote
    })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
