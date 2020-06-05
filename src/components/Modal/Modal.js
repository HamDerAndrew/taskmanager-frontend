import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
    return (
        <div className={`${styles.modal} ${props.active ? styles.modalActive : ''}`} >
            <div className={styles.modalBody}>
                <form className={styles.taskForm} onSubmit={props.handleSubmit}>
                    <label>Edit your task</label>
                    <input type="text" name="description" value={props.description} placeholder="Description" onChange={props.handleChange} className={styles.taskDescription}/>
                    <div className={styles.checkboxContainer}>
                        <label className={styles.checkboxLabel}>Completed</label>
                        <input type="checkbox" name="taskStatus" checked={props.completed} onChange={props.handleChange} />
                    </div>
                    <div className={styles.btnContainer}>
                        <button onClick={props.saveTask} className={styles.saveEdit} >Save</button>
                        <button onClick={props.cancelEdit} className={styles.cancelEdit} >Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal