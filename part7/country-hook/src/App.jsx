import React, { useState } from 'react'
import useCountry from './hooks'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>Not found...</div>
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

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value.trim())
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
