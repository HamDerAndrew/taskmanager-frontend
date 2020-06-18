import React from 'react';
import styles from './userProfile.module.css';
import { Link } from 'react-router-dom';
import UserModal from '../../components/UserModal/UserModal';

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
                    <button onClick={props.toggleEdit} className={styles.btn}>Edit</button>
                </div>
            </div>
            <UserModal 
                active={props.active}
                name={props.name}
                age={props.age}
                email={props.email}
                formError={props.formError}
                errNetwork={props.errNetwork}
                errName={props.errName}
                errAge={props.errAge}
                errEmail={props.errEmail}
                errPassword={props.errPassword}
                handleChange={props.handleChange}
                updateUser={props.updateUser}
                cancelUpdate={props.cancelUpdate}
            />
        </div>
    )
}

export default UserProfile;