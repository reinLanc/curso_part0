import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Container, Paper } from '@mui/material'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await userService.getAll()
      dispatch(setUsers(usersData))
    }
    fetchUsers()
  }, [dispatch])

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" color="primary" gutterBottom textAlign="center">
          Users
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="h6">Name</Typography></TableCell>
              <TableCell><Typography variant="h6">Blogs Created</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  )
}

export default Users
