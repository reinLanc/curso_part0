import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useState } from 'react'
import { showNotification } from '../reducers/notificationReducer'

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const [comment, setComment] = useState('')

  if (!blog) {
    return <p>Blog not found</p>
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
    blogService
      .addComment(id, comment)
      .then((updatedBlog) => {
        if (updatedBlog) {
          dispatch(updateBlog(updatedBlog))
          dispatch(showNotification('Comment added successfully', 'success'))
          setComment('')
        }
      })
      .catch((error) => {
        dispatch(showNotification('Failed to add comment', 'error'))
      })
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        <strong>Likes:</strong> {blog.likes}
        <button
          id="like"
          onClick={handleLike}
          style={{ backgroundColor: 'blue', color: 'white' }}
        >
          Like
        </button>
      </p>
      <p>Added by {blog.user[0]?.name}</p>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map((comment,index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  )
}

export default BlogDetail
