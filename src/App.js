import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

const App = () => {
  const [results, setResults] = useState([])
  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const queryRef = useRef()

  useEffect(() => {
    getResults()
  }, [])

  const getResults = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(response.data.hits)
      setLoading(false)
      console.log(response.data.hits)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError(err)
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    getResults()
  }

  const handleClearSearch = () => {
    setQuery('')
    queryRef.current.focus()
  }

  return (
    <div className='container max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded'>
      <img src="https://icon.now.sh/react/c0c" alt="React logo" className='float-right h-12' />
      <h1 className='text-grey-darkest font-thin'>Hooks News</h1>
      <form onSubmit={handleSubmit} className='mb-2'>
        <input type="text" name='query' onChange={event => setQuery(event.target.value)} value={query} ref={queryRef} className='border p-1 rounded' />
        <button type='submit' onClick={getResults} className='bg-orange rounded m-1 p-1'>Search</button>
        <button type='button' onClick={handleClearSearch} className='bg-teal text-white p-1 rounded'>Clear</button>
      </form>

      {loading ? <div className='font-bold text-orange-dark'>Loading results...</div>
        : (<ul className='list-reset reading-normal'>
          {results.map(result => (
            <li key={result.objectID} className='p-2'>
              <a href={result.url} className='text-indigo-dark hover:text-indigo-darkest'>{result.title}</a>
            </li>
          ))}
        </ul>)}
      {error && <div className='text-red font-bold'>{error.message}</div>}
    </div>
  )
}

export default App
