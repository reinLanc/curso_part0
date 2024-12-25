import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state,action) {
      const id = action.payload
      const anecdote = state.find((a) => a.id === id)
      if (anecdote) {
        anecdote.votes +=1
      }
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdoteAction = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === id)
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.votedAnecdote(id, votedAnecdote)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer
