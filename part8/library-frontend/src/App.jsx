import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const [favoriteGenre, setFavoriteGenre] = useState('')

  const handleLogin = (newToken) => {
    setToken(newToken)
    localStorage.setItem('library-user-token', newToken)
    const decodedToken = JSON.parse(atob(newToken.split('.')[1]))
    setFavoriteGenre(decodedToken.favoriteGenre)
    setPage('authors')
  }

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommended')}>recommended</button>}
        {!token ? (
          <button onClick={() => setPage('login')}>login</button>
        ) : (
          <button onClick={logout}>logout</button>
        )}
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      {page === 'recommended' && <RecommendedBooks favoriteGenre={favoriteGenre} />}
      {token && <NewBook show={page === 'add'} token={token} setPage={setPage}/>}
      {page === 'login' && !token && <LoginForm setToken={handleLogin} />}
    </div>
  )
}

export default App
