import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Home from './containers/Home'
import Story from './containers/Story'
import Layout from './hoc/Layout'
import SearchContext from './context/search-context'
import { searchURL } from './shared/misc'

const App = (props) => {

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getResults = async () => {
    setLoading(true)

    const url = `${searchURL}/search_by_date?query=${query}&tags=story&page=${page}`

    try {
      const response = await axios.get(url)
      setResults(response.data.hits)
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
      setError(err)
    }
  }


  return (
    <SearchContext.Provider value={{ query, setQuery, page, setPage, results, getResults, loading, error }}>
      <Layout>
        <Switch>
          <Route path='/story/:id' component={Story} />
          <Route path='/' exact component={Home} />
        </Switch>
      </Layout>
    </SearchContext.Provider>

  )
}

export default App
