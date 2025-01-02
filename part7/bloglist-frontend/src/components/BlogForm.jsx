import React from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const BlogForm = ({ createBlog }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!title.inputProps.value.trim() ||
        !author.inputProps.value.trim() ||
        !url.inputProps.value.trim()) {
      dispatch(showNotification('All fields (Title, Author, URL) are required', 'error'))
      return
    }

    createBlog({
      title: title.inputProps.value,
      author: author.inputProps.value,
      url: url.inputProps.value,
    })
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 3,
        borderRadius: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        Create New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          {...title.inputProps}
          label="Title"
          placeholder="Enter Blog Title"
          fullWidth
          data-testid="Title"
        />
        <TextField
          {...author.inputProps}
          label="Author"
          placeholder="Enter Blog Author"
          fullWidth
          data-testid="Author"
        />
        <TextField
          {...url.inputProps}
          label="URL"
          placeholder="Enter Blog URL"
          fullWidth
          data-testid="URL"
        />
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

