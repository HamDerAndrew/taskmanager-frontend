import React from 'react';
import styles from './login.module.css'

const Login = (props) => {
    return (
        <form className={styles.formbox}>
        <p className={styles.welcome}>Enter your information for logging in or sign up</p>
        <input type="text" name="username" placeholder="Email" className={styles.inputBox} />
        <input type="password" name="password" placeholder="Password" className={styles.inputBox} />
        <button type="submit" name="login" className={styles.btn}>Login</button>
      </form>
    )
}

export default Login