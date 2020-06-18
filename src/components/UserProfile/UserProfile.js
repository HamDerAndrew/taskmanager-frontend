import React from 'react';
import styles from './userProfile.module.css';
import UserModal from '../../components/UserModal/UserModal';

const UserProfile = (props) => {
    return (
        <div className={styles.userProfileBody}>
            <div className={styles.infoContainer}>
                <h2>Profile</h2>
                <h3>Name:</h3>
                <p className={styles.inputBox}> {props.name} </p>
                <h3>Age:</h3>
                <p className={styles.inputBox}>{props.age}</p>
                <h3>Email:</h3>
                <p className={styles.inputBox}>{props.email}</p>
                <h3>Password:</h3>
                <p className={styles.inputBox}>password will not be displayed</p>
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