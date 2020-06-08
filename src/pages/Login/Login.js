import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './login.module.css';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Footer/Footer';
import LoginForm from '../../components/LoginForm/LoginForm';
import { LogIn } from '../../services/ApiService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      token: '',
      email: 'andrewsondergaard@gmail.com',
      password: 'test123',
      loading: false
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
    event.preventDefault();
    this.setState({
      loading: true
    })
    LogIn(email,password)
    .then((response) => {
      this.setState({
        token: response.data.token,
        loggedIn: true,
        loading: false
      })
      this.sendData();
      this.props.history.push("/user")
    }).catch((error) => {
      console.log(error)
      this.setState({
        loading: false
      })
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
              loadSpin={this.state.loading}
            />
        </div> 
        <Footer />
      </div>
    );
  }
}

export default Login;
