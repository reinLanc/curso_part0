import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../reducers/filterReducer'
import reducer from '../reducers/anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: reducer,
    filter: filterReducer
  }
})

export default store