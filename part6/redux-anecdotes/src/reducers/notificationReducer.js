import { createSlice } from '@reduxjs/toolkit'

const initialState = 'message in a bottle'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification:(state, action) => {
      return action.payload
    },
    clearNotification: () => {
      return ''
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer