import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './home.module.css';
import Footer from '../../components/Footer/Footer';
import Login from '../../components/Login/Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      email: event.target.value,
      password: event.target.value
    })
  }

  loginHandler = (event) => {
    const { email, password } = this.state
    const url = 'https://larsen-taskmanager-project.herokuapp.com/users/login'
    event.preventDefault();
    axios.post(url, {
      email,
      password
    }).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <h1>Welcome to the task manager app</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </header>
        <div className={styles.loginbox}>
          <Login 
            email={this.state.email}
            password={this.state.password}
            handleChange={this.handleChange}
            loginHandler={this.loginHandler}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
