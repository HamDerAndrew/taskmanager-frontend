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
            selectedOption: 'completed'
        }
    }

    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
          selectedOption: event.target.value
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
            console.log(response.data)
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
    }

    cancelEdit = () => {
        this.setState({
            isModalToggled: false
        })
    }

    toggleModal = () => {
        this.setState(prevState => ({
            isModalToggled: !this.state.isModalToggled
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
                                <button onClick={this.toggleModal}>Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Modal
                        isCompleted="completed" 
                        isNotCompleted="uncompleted"
                        completedTrue={this.state.selectedOption === 'completed'}
                        completedFalse={this.state.selectedOption === 'uncompleted'} 
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