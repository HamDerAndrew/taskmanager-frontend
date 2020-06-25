import React, { Component } from 'react';
import styles from './user.module.css';
import axios from 'axios';
import Spinner from 'react-spinkit';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import TaskList from '../../components/TaskList/TaskList';
import Modal from '../../components/Modal/Modal';
import CreateTaskModal from '../../components/Modal/Modal';
import Footer from '../../components/Footer/Footer';
import { CreateTask, UpdateTask, DeleteTask, LogOut } from '../../services/ApiService';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchingTasks: true,
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

    readTasks =  () => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/tasks'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.get(url, { 'headers': header })  
        .then((response) => {
            this.setState({
                tasks: response.data,
                fetchingTasks: false
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    createTask = () => {
        const { token, description, taskStatus } = this.state
        CreateTask(token, description, taskStatus)
        .then((response) => {
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
                <div className={styles.userContainer}>
                    <div className={styles.crudBtns}>
                        <button onClick={this.readUser} className={styles.btn}>Read user</button>
                        <button onClick={() => this.createTaskModal("", this.state.taskStatus)} className={styles.createBtn}>Create task</button>
                        <button onClick={this.logOut} className={styles.btn}>Log out</button>
                    </div>
                    <div className={styles.userMenu}>
                        <Link to="/profile" className={styles.userIcon}>
                            <FontAwesomeIcon size={"lg"} icon={faUser} />
                        </Link>
                    </div>
                </div>
                <p>These are all of your tasks</p>
                {
                    this.state.fetchingTasks
                    ?
                    <div className={styles.loadContainer}> 
                        <Spinner fadeIn="none" name="folding-cube" color="blue" className={styles.showSpin}/>
                    </div>
                    :
                    <TaskList 
                        tasks={this.state.tasks}
                        deleteTask={this.deleteTask}
                        toggleModal={this.toggleModal}
                    />
                }
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