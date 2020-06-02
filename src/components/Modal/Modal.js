import React from 'react';
import styles from './modal.module.css';

const Modal = (props) => {
    return (
        <div className={`${styles.modal} ${props.active ? styles.modalActive : ''}`} onClick={props.cancelEdit}>
            <div className={styles.modalBody}>
                <form className={styles.taskForm} onSubmit={props.handleSubmit}>
                    <label>Edit your task</label>
                    <input type="text" name="description" value={props.description} placeholder="Description" className={styles.taskDescription}/>
                    <div className={styles.radioBox}>
                        <input type="radio" name="isCompleted" checked={props.completedTrue} value={props.isCompleted} onChange={props.handleChange} className={styles.status}/>
                        <input type="radio" name="isNotCompleted" checked={props.completedFalse} value={props.isNotCompleted} onChange={props.handleChange} className={styles.status} />
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