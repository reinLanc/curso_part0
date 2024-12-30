import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog as createBlogAction, updateBlog as updateBlogAction, deleteBlog as deleteBlogAction } from './reducers/blogReducer'
import { removeUser, setUser as setUserAction } from './reducers/userReducer'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import NavBar from './components/NavBar'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      dispatch(setUserAction(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      dispatch(setUserAction(user))
      setUsername('')
      setPassword('')
      dispatch(showNotification('Login successful', 'success'))
    } catch (exception) {
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsAppUser')
    setUser(null)
    dispatch(removeUser())
    dispatch(showNotification('Logged out successfully', 'success'))
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      dispatch(createBlogAction(returnedBlog))
      dispatch(
        showNotification(
          `A new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`,
          'success'
        )
      )
    } catch (error) {
      dispatch(showNotification('Failed to add blog', 'error'))
    }
  }

  const updateBlog = async (id, blog) => {
    try {
      const returnedBlog = await blogService.update(id, blog)
      dispatch(updateBlogAction(returnedBlog))
    } catch (error) {
      dispatch(showNotification('Failed to update likes', 'error'))
    }
  }

  const deleteBlog = async (blog) => {
    const confirmMessage = `Remove blog '${blog.title}' by '${blog.author}'?`
    if (window.confirm(confirmMessage)) {
      try {
        await blogService.deleteBlog(blog.id)
        dispatch(deleteBlogAction(blog.id))
        dispatch(
          showNotification(
            `Blog '${blog.title}' removed successfully`,
            'success'
          )
        )
      } catch (error) {
        dispatch(showNotification('Failed to delete blog', 'error'))
      }
    }
  }

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
    <Router>
      <div>
        <Notification />
        <NavBar user={user} handleLogout={handleLogout}/>
        <h2>Blogs</h2>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Togglable id="cb" buttonLabel="Create new blog!" ref={blogFormRef}>
                  <BlogForm createBlog={addBlog} />
                </Togglable>
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
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogDetail updateBlog={updateBlog} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

