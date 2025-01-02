import { Box } from '@mui/material'
import ToggleMenu from './ToggleMenu'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogsPage = ({ blogs, user, blogFormRef, addBlog, updateBlog, deleteBlog }) => {
  return (
    <Box>
      <ToggleMenu buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </ToggleMenu>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            username={user.username}
          />
        ))}
    </Box>
  )
}

export default BlogsPage
