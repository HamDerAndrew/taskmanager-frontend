import React from 'react';
import styles from './login.module.css'

const Login = (props) => {
    return (
        <form className={styles.formbox}>
        <p className={styles.welcome}>Enter your information for logging in or sign up</p>
        <input type="text" name="username" placeholder="Email" value={props.email} onChange={props.handleChange} className={styles.inputBox} />
        <input type="password" name="password" placeholder="Password" value={props.password} onChange={props.handleChange} className={styles.inputBox} />
        <button type="submit" name="login" className={styles.btn} onClick={props.loginHandler}>Login</button>
      </form>
    )
}

export default Login