import { Box, Typography, Button, TextField, List, ListItem, Paper } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { showNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import LinkIcon from '@mui/icons-material/Link'

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const comment = useField('text')

  if (!blog) {
    return <Typography>Blog not found</Typography>
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    await blogService.update(blog.id, updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment.inputProps.value.trim()) {
      dispatch(showNotification('Comment cannot be empty', 'error'))
      return
    }
    blogService
      .addComment(id, comment.inputProps.value)
      .then((updatedBlog) => {
        if (updatedBlog) {
          dispatch(updateBlog(updatedBlog))
          dispatch(showNotification('Comment added successfully', 'success'))
          comment.reset()
        }
      })
      .catch(() => {
        dispatch(showNotification('Failed to add comment', 'error'))
      })
  }

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        {blog.title} by {blog.author}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
          {blog.url}
        </a>
      </Typography>
      <Box mt={2}>
        <Typography variant="body1" gutterBottom>
          <strong>Likes:</strong> {blog.likes}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleLike}title="Like">
          <ThumbUpIcon />
        </Button>
      </Box>
      <Typography variant="subtitle1" mt={4}>
        Added by {blog.user[0]?.name}
      </Typography>
      <Typography variant="h6" mt={4}>
        Comments <CommentIcon />
      </Typography>
      <List>
        {blog.comments.map((comment, index) => (
          <ListItem key={index} sx={{ display: 'list-item',listStyleType: 'disc',pl: 2,gap: 0 }}>
            <Typography variant="body1" color="textPrimary"sx={{ marginLeft: '-1rem' }} >
              {comment}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          {...comment.inputProps}
          label="Add a comment"
          fullWidth
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Add Comment
        </Button>
      </Box>
    </Paper>
  )
}

export default BlogDetail

