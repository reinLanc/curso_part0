import PropTypes from 'prop-types'
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" color="primary" textAlign="center" gutterBottom>
          Log In
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center" mb={3}>
          Welcome back! Please enter your credentials.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            data-testid="username"
            placeholder="Enter your username"
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            data-testid="password"
            placeholder="Enter your password"
          />
          <Button
            id="login"
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ mt: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm