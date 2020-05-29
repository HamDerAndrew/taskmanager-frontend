import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './login.module.css';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Footer/Footer';
import Login from '../../components/LoginForm/LoginForm';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      token: this.props.token,
      email: 'andrewsondergaard@gmail.com',
      password: 'test123'
    }
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value,
    })
  }

  handlePassword = (event) => {
    this.setState({
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
      console.log(response.data.token)
      this.setState({
        token: response.data.token,
        // loggedIn: this.props.loggedIn
      })
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
        <h1>Login status:{this.props.loggedIn}</h1>
        <Navigation />
          <Login 
              email={this.state.email}
              password={this.state.password}
              handleEmail={this.handleEmail}
              handlePassword={this.handlePassword}
              loginHandler={this.loginHandler}
            />
        <Footer />
      </div>
    );
  }
}

export default Home;
