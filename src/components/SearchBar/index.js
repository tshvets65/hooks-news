import React, { useContext } from 'react'
import { withRouter } from 'react-router-dom'
import SearchContext from '../../context/search-context'
import classes from './SearchBar.module.css'

const SearchBar = props => {
    const handleSubmit = event => {
        event.preventDefault()
        setPage(0)
        getResults()
        props.history.push('/')
    }

    const { query, setQuery, getResults, setPage } = useContext(SearchContext)

    return (
        <form onSubmit={handleSubmit} className={classes.search_form}>
            <input
                type="search"
                name='search'
                onChange={event => setQuery(event.target.value)}
                value={query}
                className={classes.search_input}
                placeholder='Search stories'
                size={20}
                maxLength={100}
            />
            <button type='submit' onClick={handleSubmit} className={classes.icon}><img src='https:icon.now.sh/search/30/ff6600' alt='search icon' /></button>
        </form>
    )
}

export default withRouter(SearchBar)