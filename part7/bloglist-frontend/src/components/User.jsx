import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await userService.getUser(id)
      setUser(fetchedUser)
    }
    fetchUser()
  }, [id])

  if(!user) {
    return <p>Loading...</p>
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs created:</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User