import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useState, useEffect } from 'react'

const Books = (props) => {
  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book added: ${data.bookAdded.title}`)
    },
  })

  const [genre, setGenre] = useState('')
  const [allGenres, setAllGenres] = useState([])
  const [books, setBooks] = useState([])

  const { loading, error, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre },
  })

  const { data: initialData, loading: initialLoading } = useQuery(ALL_BOOKS, {
    variables: { genre: '' },
  })

  useEffect(() => {
    if (initialData) {
      const genres = Array.from(
        new Set(initialData.allBooks.flatMap((book) => book.genres))
      )
      setAllGenres(genres)
    }
  }, [initialData])

  useEffect(() => {
    if (data) {
      setBooks(data.allBooks)
    }
  }, [data])

  if (!props.show) {
    return null
  }

  if (loading || initialLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching books</div>

  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value
    setGenre(selectedGenre)
    refetch({ genre: selectedGenre })
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        <label>Filter by genre: </label>
        <select onChange={handleGenreChange} value={genre}>
          <option value="">All genres</option>
          {allGenres.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>
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
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres ? book.genres.join(', ') : 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books



