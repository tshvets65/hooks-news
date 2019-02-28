import React, { useEffect, useContext } from 'react'

import StoryList from '../../components/StoryList'
import classes from './Home.module.css'
import SearchContext from '../../context/search-context'

const Home = () => {

    const { results, getResults, loading, error, page, setPage } = useContext(SearchContext)

    useEffect(() => {
        getResults()
    }, [page])

    return (
        <>
            {loading && <div className={classes.loading_msg}>Loading stories...</div>}
            {error && <div className={classes.error}>{error.message}</div>}
            {results && <StoryList stories={results} />}
            <footer>
                {page > 0 && <span onClick={() => setPage(page - 1)}><img src='https://icon.now.sh/chevronLeft/30/ff6600' alt='previous page icon' /></span>}
                {page < 49 && <span onClick={() => setPage(page + 1)}><img src='https://icon.now.sh/chevronRight/30/ff6600' alt='next page icon' /></span>}
            </footer>
        </>
    )
}

export default Home