import { useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const { loading, error, data } = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error fetching authors</div>

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || 'Not set'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} />
    </div>
  )
}

const SetBirthYear = ({ authors }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [year, setYear] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.error(error),
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor({
      variables: { name: selectedAuthor.value, setBornTo: parseInt(year, 10) },
    })
    setSelectedAuthor(null)
    setYear('')
  }

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  return (
    <form onSubmit={submit}>
      <div>
        Author
        <Select
          options={options}
          onChange={setSelectedAuthor}
          value={selectedAuthor}
        />
      </div>
      <div>
        Birth year
        <input
          type="number"
          value={year}
          onChange={({ target }) => setYear(target.value)}
        />
      </div>
      <button type="submit" disabled={!selectedAuthor || !year}>
        Update author
      </button>
    </form>
  )
}

export default Authors
