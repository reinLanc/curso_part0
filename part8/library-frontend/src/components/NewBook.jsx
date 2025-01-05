import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    update: (cache, { data: { addBook } }) => {
      if (addBook.genres.includes(genre)) {
        cache.modify({
          fields: {
            allBooks(existingBooks = []) {
              return [...existingBooks, addBook]
            },
          },
        })
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.error('Error adding book:', error.message)
    },
    onCompleted: () => {
      setTitle('')
      setAuthor('')
      setPublished('')
      setGenres([])
      props.setPage('books')
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const validPublished = parseInt(published, 10)
    if (!title || !author || isNaN(validPublished) || genres.length === 0) {
      console.error('Invalid input data')
      return
    }
    try {
      await addBook({
        variables: { title, author, published: validPublished, genres },
      })
    } catch (error) {
      console.error('Error while submitting:', error.message)
    }
  }

  const handleGenreChange = (event) => {
    setGenre(event.target.value)
  }

  const handleAddGenre = () => {
    if (genre && !genres.includes(genre)) {
      setGenres([...genres, genre])
    }
    setGenre('')
  }

  if (!props.token) {
    return <p>Please log in to add a book.</p>
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre
          <input value={genre} onChange={handleGenreChange} />
          <button type="button" onClick={handleAddGenre}>
            Add genre
          </button>
        </div>
        <div>genres: {genres.join(', ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
