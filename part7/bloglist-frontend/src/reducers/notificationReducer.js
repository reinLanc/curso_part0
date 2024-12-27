import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear() {
      return null
    }
  },
})

export const setNotification = (message, type = 'success', seconds = 5) => {
  return (dispatch) => {
    dispatch(set({ message, type }))
    setTimeout(() => {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = notificationSlice.actions
export default notificationSlice.reducer