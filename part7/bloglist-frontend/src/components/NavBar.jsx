import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#282c34',
    color: '#fff',
  }

  const linkStyle = {
    color: '#61dafb',
    textDecoration: 'none',
    margin: '0 10px',
  }

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }

  const buttonStyle = {
    padding: '5px 10px',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    color: '#000',
  }

  return (
    <nav style={navbarStyle}>
      <div>
        <Link to="/" style={linkStyle}>
          Blogs
        </Link>
        <Link to="/users" style={linkStyle}>
          Users
        </Link>
      </div>
      {user && (
        <div style={userStyle}>
          <span>{user.name} logged in</span>
          <button id="logout" onClick={handleLogout} style={buttonStyle}>
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
