import React, { Component } from 'react';
import styles from './user.module.css';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.loggedIn,
            tasks: [],
            token: this.props.token
        }
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

    readTasks = async () => {
        const url = await 'https://larsen-taskmanager-project.herokuapp.com/tasks'
        const header = { 'Authorization': `Bearer ${this.state.token}`}
        axios.get(url, { 'headers': header })
        .then((response) => {
            console.log(response.data)
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

    componentDidMount() {
        this.readTasks()
        let tasks = [
            {
                id: 1,
                description: "Let's develop something",
                completed: "false"
            },
            {
                id: 2,
                description: "Let's make React Router work",
                completed: "false"
            }
        ]
        this.setState({tasks: tasks})
    }

    render() {
       
        return (
            <Route render={(props) => (
                this.state.isLoggedIn ?
                (<div className={styles.userBody}>
                    <h1>Welcome to your tasks</h1>
                    <button onClick={this.readUser} >Read user</button>
                    <button onClick={this.readTasks} >Read tasks</button>
                    <button onClick={this.logOut}>Log out</button>
                    <p>These are all of your tasks</p>
                    {this.state.tasks.map((item) => (
                        <li key={item.id}> 
                            Task: {item.description} - Completed: {item.completed}
                        </li>
                    ))}
                    </div>)
                :
                <Redirect to="/" />
            )}/>
            
        )
    }
}

export default User