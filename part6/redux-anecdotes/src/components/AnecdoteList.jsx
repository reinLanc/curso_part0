import { useDispatch, useSelector } from 'react-redux'
import { useMemo } from 'react'
import { voteAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes || [])
  const filter = useSelector((state) => state.filter || '')

  const orderedAnecdotes = useMemo(() => {
    return anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
  }, [anecdotes, filter])

  const vote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    dispatch(voteAnecdoteAction(id))
    dispatch(setNotificationAction(`You have voted: "${anecdote.content}"`))
  }

  return (
    <div>
      <hr />
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
