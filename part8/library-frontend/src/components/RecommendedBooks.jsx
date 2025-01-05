import { useQuery, useLazyQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, GET_ME } from '../queries'

const RecommendedBooks = ({ token }) => {
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const { loading, error, data } = useQuery(ALL_BOOKS)

  const { data: userData, loading: userLoading, error: userError } = useQuery(GET_ME, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  })

  useEffect(() => {
    if (userData && userData.me) {
      setFavoriteGenre(userData.me.favoriteGenre)
    }
  }, [userData])

  if (userLoading) return <div>Loading user info...</div>
  if (userError) return <div>Error fetching user</div>
  if (loading) return <div>Loading books...</div>
  if (error) return <div>Error fetching books</div>

  const filteredBooks = data.allBooks.filter(book => book.genres.includes(favoriteGenre))

  return (
    <div>
      <h2>Recommended Books for {favoriteGenre} Genre</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length === 0 ? (
            <tr>
              <td colSpan="4">No books available for this genre.</td>
            </tr>
          ) : (
            filteredBooks.map((book, index) => (
              <tr key={`${book.title}-${index}`}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
                <td>{book.genres.join(', ')}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks
