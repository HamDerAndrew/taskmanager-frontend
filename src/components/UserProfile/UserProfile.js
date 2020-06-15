import React from 'react';
import styles from './userProfile.module.css';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {
    return (
        <div className={styles.userProfileBody}>
            <div>
                <Link to="/user">Back to tasks</Link>
            </div>
            <div>
                <h2>Profile</h2>
                <h3>Name:</h3>
                <p>{props.name}</p>
                <h3>Age:</h3>
                <p>{props.age}</p>
                <h3>Email:</h3>
                <p>{props.email}</p>
                <h3>Password:</h3>
                <p>{props.password}</p>
                <div>
                    <button className={styles.btn}>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;