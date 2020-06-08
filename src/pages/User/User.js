import React, { Component } from 'react';
import styles from './user.module.css';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';
import CreateTask from '../../components/Modal/Modal';
import Footer from '../../components/Footer/Footer';

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
            taskStatus: true
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
            // this.props.history.replace({pathname: this.props.history.pathname("/")})
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
        console.log("create task")
        const { description, taskStatus } = this.state
        const url = 'https://larsen-taskmanager-project.herokuapp.com/tasks'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.post(url, 
            {
                description,
                taskStatus
            }, 
            { 'headers': header })
        .then((response) => {
            console.log("Task created. ", response.data)
            this.readTasks()
        }).catch((error) => {
            console.log(error)
        })
    }

    deleteTask = (taskId) => {
        console.log("Delete task:", taskId)
        const url = `https://larsen-taskmanager-project.herokuapp.com/tasks/${taskId}`
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.delete(url, {'headers': header})
        .then((response) => {
            this.readTasks();
        }).catch((error) => {
            console.log(error)
        })
    }

    updateTask = (taskId) => {
        const url = `https://larsen-taskmanager-project.herokuapp.com/tasks/${taskId}`
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.patch(url, {
            description: this.state.description,
            completed: this.state.taskStatus
        }, {'headers': header})
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
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/logout'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.post(url, {}, {'headers': header})
        .then((response) => {
            this.setState({ token: '', loggedIn: false})
            this.sendLogout();
            this.props.history.goBack()
            console.log(response.data)
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
        console.log(id)
        console.log(task)
        console.log(status)
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
        console.log("User component mounted")
        this.readTasks()
    }

    render() {
        return (
            <Route render={(props) => (
                this.state.isLoggedIn ?
                (<div className={styles.userBody}>
                    <div className={styles.userContent}>
                    <h1>Welcome to your tasks</h1>
                    <button onClick={this.readUser} className={styles.btn}>Read user</button>
                    <button onClick={this.readTasks} className={styles.btn}>Read tasks</button>
                    <button onClick={() => this.createTaskModal("", "")} className={styles.createBtn}>Create task</button>
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
                     <CreateTask 
                        description={this.state.description}
                        completed={this.state.taskStatus}
                        active={this.state.createTaskModalToggled}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        cancelEdit={this.cancelEdit}
                     />
                     </div>
                     <Footer />
                    </div>)
                :
                <Redirect to="/" />
            )}/>
            
        )
    }
}

export default User