import { createContext, useContext, useReducer } from 'react'


const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'SHOW':
    return action.payload
  case 'HIDE':
    return null
  default:
    return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if(!context) {
    throw new Error('useNotification must be used into NotificationProvider')
  }
  return context
}