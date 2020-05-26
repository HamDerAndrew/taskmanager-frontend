import React from 'react'
import styles from './emoji.module.css'

const Emoji = (props) => {
    return (
        <span
        className={styles.emoji}
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}>
            {props.symbol}
        </span>
    )
}

export default Emoji;