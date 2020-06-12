import React, { Component } from 'react';
import styles from './user.module.css';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import CreateTaskModal from '../../components/Modal/Modal';
import Footer from '../../components/Footer/Footer';
import { CreateTask, UpdateTask, DeleteTask, LogOut } from '../../services/ApiService';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.loggedIn,
            tasks: [],
            token: this.props.token,
            isModalToggled: false,
            createTaskModalToggled: false,
            taskId: '',
            description: '',
            taskStatus: false
        }
    }

    handleChange = (event) => {
        const eventValue = event.target.name === 'taskStatus' ? event.target.checked : event.target.value
        this.setState({
          [event.target.name]: eventValue
        })
      }

    readUser = () => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/user'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        
        axios.get(url, { 'headers': header })
        .then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    readTasks =  () => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/tasks'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.get(url, { 'headers': header })  
        .then((response) => {
            this.setState({tasks: response.data})
        }).catch((error) => {
            console.log(error)
        })
    }

    createTask = () => {
        const { token, description, taskStatus } = this.state
        CreateTask(token, description, taskStatus)
        .then((response) => {
            console.log("Task created. ", response.data)
            this.readTasks()
        }).catch((error) => {
            console.log(error)
        })
    }

    deleteTask = (taskId) => {
        DeleteTask(taskId, this.state.token)
        .then((response) => {
            this.readTasks();
        }).catch((error) => {
            console.log(error)
        })
    }

    updateTask = (taskId) => {
        const { token, description, taskStatus } = this.state
        UpdateTask(taskId, token, description, taskStatus)
        .then((response) => {
            console.log(response.data)
            this.readTasks();
        }).catch((error) => {
            console.log(error)
        })
    }

    sendLogout = () => {
        this.props.logoutCallback({loggedIn: this.state.loggedIn, token: this.state.token})
    }

    logOut = () => {
        LogOut(this.state.token)
        .then((response) => {
            this.setState({ token: '', loggedIn: false})
            this.sendLogout();
            this.props.history.goBack()
        }).catch((error) => {
            console.log(error)
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.isModalToggled) {
            this.updateTask(this.state.taskId);
        }
        if (this.state.createTaskModalToggled) {
            this.createTask()
        }
        this.setState({
            isModalToggled: false,
            createTaskModalToggled: false
        })
    }

    cancelEdit = (event) => {
        event.preventDefault()
        this.setState({
            isModalToggled: false,
            createTaskModalToggled: false,
        })
    }

    toggleModal = (id, task, status) => {
        this.setState(prevState => ({
            isModalToggled: !this.state.isModalToggled,
            taskId: id,
            description: task,
            taskStatus: status
        }))
    }

    createTaskModal = (task, status) => {
        this.setState(prevState => ({
            createTaskModalToggled: !this.state.createTaskModalToggled,
            description: task,
            taskStatus: status
        }))
    }

    componentDidMount() {
        this.readTasks()
    }

    render() {
        return (
            <div className={styles.userBody}>
                <div className={styles.userContent}>
                <h1>Welcome to your tasks</h1>
                <button onClick={this.readUser} className={styles.btn}>Read user</button>
                <button onClick={this.readTasks} className={styles.btn}>Read tasks</button>
                <button onClick={() => this.createTaskModal("", this.state.taskStatus)} className={styles.createBtn}>Create task</button>
                <button onClick={this.logOut} className={styles.btn}>Log out</button>
                <p>These are all of your tasks</p>
                <ul>
                    {this.state.tasks.map((item) => (
                        <li key={item._id} className={styles.listItem}>
                            <div className={styles.taskItem}>
                                <div>
                                    <p>Task: {item.description}</p>
                                    <p>Completed: {item.completed.toString()}</p>
                                </div>
                                <div className={styles.btnContainer}>
                                    <button onClick={() => this.deleteTask(item._id)} className={styles.deleteBtn}>Delete</button>
                                    <button onClick={() => this.toggleModal(item._id, item.description, item.completed)} className={styles.editBtn}>Edit</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <Modal
                    description={this.state.description}
                    completed={this.state.taskStatus}
                    active={this.state.isModalToggled}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    cancelEdit={this.cancelEdit}
                    />
                    <CreateTaskModal 
                    description={this.state.description}
                    completed={this.state.taskStatus}
                    active={this.state.createTaskModalToggled}
                    handleSubmit={this.handleSubmit}
                    handleChange={this.handleChange}
                    cancelEdit={this.cancelEdit}
                    />
                    </div>
                    <Footer />
                </div>
        )
    }
}

export default User