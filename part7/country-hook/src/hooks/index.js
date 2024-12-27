import { useEffect, useState } from 'react'
import axios from 'axios'

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name.trim()) {
      setCountry(null)
      return
    }

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${name}`
        )
        setCountry({ found: true, data: response.data })
      } catch (error) {
        console.error('Error fetching country data:', error.message)
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name])

  return country
}

export default useCountry

