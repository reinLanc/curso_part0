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

export const NotificationProvider = ( props ) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if(!context) {
    throw new Error('useNotification must be used into NotificationProvider')
  }
  return context
}

export const useNotificationMessage = () => {
  const { dispatch } = useNotification()
  return (payload) => {
    dispatch({ type: 'SHOW', payload })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, 5000)
  }
}

export default NotificationContext