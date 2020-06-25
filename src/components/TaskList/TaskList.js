import React from 'react';
import styles from './taskList.module.css'

const TaskList = (props) => {
    return (
        <ul>
        {props.tasks.map((item) => (
            <li key={item._id} className={styles.listItem}>
                <div className={styles.taskItem}>
                    <div>
                        <p>Task: {item.description}</p>
                        <p>Completed: {item.completed.toString()}</p>
                    </div>
                    <div className={styles.btnContainer}>
                        <button onClick={() => props.deleteTask(item._id)} className={styles.deleteBtn}>Delete</button>
                        <button onClick={() => props.toggleModal(item._id, item.description, item.completed)} className={styles.editBtn}>Edit</button>
                    </div>
                </div>
            </li>
            ))}
        </ul>
    )
}

export default TaskList