import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification:(state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationAction = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer