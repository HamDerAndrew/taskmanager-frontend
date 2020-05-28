import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css'

const Navigation = () => {
    return (
        <header className={styles.appHeader}>
        <nav>
            <h1>Welcome to the task manager app</h1>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
         </header>
    )
}

export default Navigation