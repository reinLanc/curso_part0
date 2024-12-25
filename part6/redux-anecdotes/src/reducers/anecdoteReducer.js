import { createSlice } from '@reduxjs/toolkit'
const getId = () => (100000 * Math.random()).toFixed(0)

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
      const newAnecdote = { ...action.payload, id: getId() }
      state.anecdotes.push(newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
