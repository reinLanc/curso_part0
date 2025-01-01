import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button component={Link} to="/" color="inherit">
            Blogs
          </Button>
          <Button component={Link} to="/users" color="inherit">
            Users
          </Button>
        </Box>
        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" color="inherit">
              {user.name} logged in
            </Typography>
            <Button
              id="logout"
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

Navbar.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  handleLogout: PropTypes.func.isRequired,
}

export default Navbar
