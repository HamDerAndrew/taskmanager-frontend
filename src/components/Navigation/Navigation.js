import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css'

const Navigation = () => {
    return (
        <header className={styles.appHeader}>
        <nav className={styles.navBar}>
            <h1>Task Manager App</h1>
            <ul className={styles.navList}>
                <li className={styles.navListItem}>
                <Link to="/">Home</Link>
                </li>
                <li className={styles.navListItem}>
                <Link to="/signup">Sign up</Link>
                </li>
                <li className={styles.navListItem}>
                <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
         </header>
    )
}

export default Navigation