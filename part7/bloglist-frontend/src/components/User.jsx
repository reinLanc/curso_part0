import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { Container, Typography, Paper, List, ListItem, ListItemText } from '@mui/material'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getUser(id)
      setUser(fetchedUser)
    }
    fetchUser()
  }, [id])

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h6" textAlign="center" color="textSecondary">
          Loading...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Blogs Created:
        </Typography>
        {user.blogs.length === 0 ? (
          <Typography variant="body1" color="textSecondary">
            This user has not created any blogs yet.
          </Typography>
        ) : (
          <List>
            {user.blogs.map((blog) => (
              <ListItem key={blog.id}>
                <ListItemText primary={blog.title} />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  )
}

export default User
