import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: '',
      email: 'andrewsondergaard@gmail.com',
      password: 'test123',
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  sendData = () => {
    this.props.loginCallback({loggedIn: this.state.loggedIn, token: this.state.token})
  }

  loginHandler = (event) => {
    const { email, password } = this.state
    const url = 'https://larsen-taskmanager-project.herokuapp.com/users/login'
    event.preventDefault();
    axios.post(url, {
      email,
      password
    }).then((response) => {
      this.setState({
        token: response.data.token,
        loggedIn: true
      })
      this.sendData();
      //axios.defaults.headers.common['Authorization'] =  `Bearer ${this.state.token}`
      this.props.history.push("/user")
    }).catch((error) => {
      console.log(error)
    })
  }

  render() {
    return (
      this.state.loggedIn
      ?
      <Redirect to="/user" />
      :
      <div className={styles.app}>
        <div className={styles.loginContent}>
        <Navigation />
          <LoginForm 
              email={this.state.email}
              password={this.state.password}
              handleChange={this.handleChange}
              loginHandler={this.loginHandler}
            />
        </div> 
        <Footer />
      </div>
    );
  }
}

export default Login;
