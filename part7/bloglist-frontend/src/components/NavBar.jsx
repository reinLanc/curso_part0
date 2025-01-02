import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import LogoutIcon from '@mui/icons-material/Logout'

const Navbar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static" sx={{ marginBottom: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Button component={Link} to="/" color="inherit">
            <HomeIcon />
          </Button>
          <Button component={Link} to="/users" color="inherit">
            Users
            <GroupIcon />
          </Button>
        </Box>
        {user && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1" color="inherit">
              {user.name} <em>Logged in!</em>
            </Typography>
            <Button
              id="logout"
              variant="contained"
              color="secondary"
              onClick={handleLogout}
            >
              Logout
              <LogoutIcon />
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
