import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Login successful', 'success'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification(
          `A new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`,
          'success'
        )
      )
    } catch (error) {
      dispatch(setNotification('Failed to add blog', 'error'))
    }
  }

  const updateBlog = async (id, updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      dispatch(setNotification('Failed to update likes', 'error'))
    }
  }

  const deleteBlog = async (blog) => {
    const confirmMessage = `Remove blog '${blog.title}' by '${blog.author}'?`
    if (window.confirm(confirmMessage)) {
      try {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        dispatch(
          setNotification(
            `Blog '${blog.title}' removed successfully`,
            'success'
          )
        )
      } catch (error) {
        dispatch(setNotification('Failed to delete blog', 'error'))
      }
    }
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in{' '}
        <button id="logout" onClick={handleLogout}>
          LogOut
        </button>
      </p>
      <Togglable id="cb" buttonLabel="Create new blog!" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs
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
    </div>
  )
}

export default App
