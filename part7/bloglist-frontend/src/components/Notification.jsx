import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const { message, type } = notification

  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    borderColor: type === 'error' ? 'red' : 'green',
  }

  return (
    <div id="notification-message" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
