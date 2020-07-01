import React from 'react';
import styles from './signupForm.module.css';
import Spinner from 'react-spinkit';

const SignupForm = (props) => {
    return (
        <form className={styles.formbox} onSubmit={props.handleSubmit}>
            <legend className={styles.required}>* indicates a required field</legend>
            <input className={styles.inputBox} type="text" name="name" value={props.name} placeholder="Name*" onChange={props.handleChange} />
            <input className={styles.inputBox} type="text" name="age" value={props.age} placeholder="Age" onChange={props.handleChange} />
            <input className={styles.inputBox} type="email" name="email" value={props.email} placeholder="Email*" onChange={props.handleChange} />
            <input className={styles.inputBox} type="password" name="password" value={props.password} placeholder="Password*" onChange={props.handleChange} />
            <button className={styles.btn} type="submit">Sign up</button>
            <div className={styles.spinContainer}>
                <Spinner name="folding-cube" color="blue" className={ props.loadSpin ? styles.showSpin : styles.hideSpin}/>
            </div>
        </form>
    )
}

export default SignupForm;