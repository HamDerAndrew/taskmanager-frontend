import React, { Component } from 'react';
import styles from './user.module.css';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../components/Modal/Modal';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.loggedIn,
            tasks: [],
            token: this.props.token,
            isModalToggled: false,
            taskId: '',
            description: '',
            taskStatus: true
        }
    }

    handleChange = (event) => {
        console.log({[event.target.name]: event.target.value})
        this.setState({
          [event.target.name]: event.target.value
        })
      }

      handleTest = (event) => {
          this.setState({
              taskStatus: event.target.value
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
        this.updateTask(this.state.taskId);
        this.setState({
            isModalToggled: false
        })
    }

    cancelEdit = (event) => {
        event.preventDefault()
        this.setState({
            isModalToggled: false,
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

    componentDidMount() {
        //this.readTasks()
    }

    render() {
        return (
            <Route render={(props) => (
                this.state.isLoggedIn ?
                (<div className={styles.userBody}>
                    <h1>Welcome to your tasks</h1>
                    <button onClick={this.readUser} >Read user</button>
                    <button onClick={this.readTasks} >Read tasks</button>
                    <button onClick={this.createTask}>Create task</button>
                    <button onClick={this.logOut}>Log out</button>
                    <p>These are all of your tasks</p>
                    <ul>
                        {this.state.tasks.map((item) => (
                            <li key={item._id}>
                                <div>
                                Task: {item.description} - Completed: {item.completed.toString()}
                                <button onClick={() => this.deleteTask(item._id)}>Delete</button>
                                <button onClick={() => this.toggleModal(item._id, item.description, item.completed)}>Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <Modal
                        description={this.state.description}
                        completedTrue={this.state.taskStatus === true}
                        completedFalse={this.state.taskStatus === false} 
                        active={this.state.isModalToggled}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        cancelEdit={this.cancelEdit}
                     />
                    </div>)
                :
                <Redirect to="/" />
            )}/>
            
        )
    }
}

export default User