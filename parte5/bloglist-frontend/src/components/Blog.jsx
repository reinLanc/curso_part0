import { useState } from 'react'

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toogleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toogleDetails}>
          {detailsVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {detailsVisible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes: {blog.likes}
            <button>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  )
}

export default Blog