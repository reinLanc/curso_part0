import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const handleLike = () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user[0]?.id,
    }
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const showDeleteButton = blog.user && blog.user[0]?.username === username

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} - {blog.author}
        <button id="view" onClick={toggleDetails} data-testid="toggle-details">
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p data-testid="likes">
            Likes: {blog.likes}
            <button id="like" onClick={handleLike}>Like</button>
          </p>
          <p>{blog.user[0]?.name}</p>
          {showDeleteButton && (
            <button onClick={handleDelete} style={{ backgroundColor: 'blue' }}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog
