import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    clearNotification() {
      return null
    },
  },
})

export const showNotification = (message, type = 'success', seconds = 5) => {
  return (dispatch) => {
    dispatch(set({ message, type }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { setNotification: set, clearNotification: clear } =
  notificationSlice.actions

export default notificationSlice.reducer
