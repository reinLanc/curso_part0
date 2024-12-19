import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message === null) return null

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

  return <div style={notificationStyle}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error','success'])
}

export default Notification
