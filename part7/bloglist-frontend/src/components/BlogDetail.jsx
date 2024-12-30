import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

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
    </div>
  )
}

export default BlogDetail
