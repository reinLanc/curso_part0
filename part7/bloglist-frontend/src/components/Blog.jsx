import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, deleteBlog, username }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = () => {
    deleteBlog(blog)
  }

  const showDeleteButton = blog.user && blog.user[0]?.username === username

  return (
    <div style={blogStyle}>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        - {blog.author}
      </div>
      <br/>
      {showDeleteButton && (
        <button onClick={handleDelete} style={{ backgroundColor: 'blue' }}>
              delete
        </button>
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
