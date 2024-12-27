import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name.trim()) {
      setCountry(null)
      return
    }

    const fetchCountry = () => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((response) => {
          setCountry({ found: true, data: response.data })
        })
        .catch((error) => {
          console.error('Error fetching country data:', error.message)
          setCountry({ found: false })
        })
    }

    fetchCountry()
  }, [name])

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
  }

  const Country = ({ country }) => {
    if (!country) {
      return null
    }

    if (!country.found) {
      return (
        <div>
          Not found...
        </div>
      )
    }

    return (
      <div>
        <h3>{country.data.name.common}</h3>
        <div>Capital: {country.data.capital}</div>
        <div>Population: {country.data.population}</div>
        <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`} />
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} placeholder="Enter country name" />
        <button>Find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App

