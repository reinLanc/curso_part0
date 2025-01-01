import { useSelector } from 'react-redux'
import { Alert, Box } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification) return null

  const { message, type } = notification

  return (
    <Box
      id="notification-message"
      sx={{
        mb: 2,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Alert
        severity={type === 'error' ? 'error' : 'success'}
        sx={{
          width: '100%',
          maxWidth: 600,
          fontSize: '16px',
        }}
      >
        {message}
      </Alert>
    </Box>
  )
}

export default Notification

