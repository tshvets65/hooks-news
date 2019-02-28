import React from 'react'
import { NavLink } from 'react-router-dom'

import classes from './Layout.module.css'
import SearchBar from '../../components/SearchBar'

const Layout = ({ children }) => (
    <div className={classes.container}>
        <nav>
            <NavLink to='/' exact style={{ display: 'flex', alignItems: 'center' }}><img src='https://icon.now.sh/home/30/ffffff' alt='home icon' /> <span>Hooks News</span></NavLink>
            <SearchBar />
        </nav>

        {children}
    </div>
)

export default Layout