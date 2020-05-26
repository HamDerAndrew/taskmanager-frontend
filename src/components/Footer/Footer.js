import React from 'react';
import Emoji from '../Emoji/Emoji'
import styles from './footer.module.css'

const Footer = (props) => {
    return (
    <footer className={styles.footer}>
        <p>Created with <Emoji symbol="💙" label="heart" /> by André Larsen </p>
    </footer>
    )
}

export default Footer