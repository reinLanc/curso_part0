import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Box } from '@mui/material'

const Blog = ({ blog, deleteBlog, username }) => {
  const handleDelete = () => {
    deleteBlog(blog)
  }

  const showDeleteButton = blog.user && blog.user[0]?.username === username

  return (
    <Card
      sx={{
        marginBottom: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="h6" component={Link} to={`/blogs/${blog.id}`} sx={{ textDecoration: 'none', color: 'primary.main' }}>
            {blog.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {blog.author}
          </Typography>
        </Box>
        {showDeleteButton && (
          <Button
            onClick={handleDelete}
            variant="contained"
            color="error"
            sx={{ marginTop: 2 }}
          >
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.arrayOf(
      PropTypes.shape({
        username: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
