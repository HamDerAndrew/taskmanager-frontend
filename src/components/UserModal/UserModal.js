import React from 'react';
import styles from './userModal.module.css';

const UserModal = (props) => {
    return (
        <div className={`${styles.userModal} ${props.active ? styles.userModalActive : ''}`} >
            <div className={styles.userModalBody}>
                <form className={styles.formbox} onSubmit={props.handleSubmit}>
                    <legend className={styles.required}>* indicates a required field</legend>
                    <input className={styles.inputBox} type="text" name="name" value={props.name} placeholder="Name" onChange={props.handleChange} />
                    <input className={styles.inputBox} type="text" name="age" value={props.age} placeholder="Age" onChange={props.handleChange} />
                    <input className={styles.inputBox} type="email" name="email" value={props.email} placeholder="Email" onChange={props.handleChange} />
                    <input className={styles.inputBox} type="password" name="password" value={props.password} placeholder="Password" onChange={props.handleChange} />
                    <div className={styles.btnContainer}>
                        <button className={styles.btn} onClick={props.updateUser} type="submit">Save</button>
                        <button className={styles.btnCancel} onClick={props.cancelUpdate} type="submit">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserModal;