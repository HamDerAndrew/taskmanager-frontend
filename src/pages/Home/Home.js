import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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

    //this.loginHandler = this.loginHandler.bind(this)
  }

  loginHandler = (event) => {
    event.preventDefault();
    this.setState({
      loggedIn: true
    })
    console.log(this.state.loggedIn)
  }

  render() {

    if (this.state.loggedIn === true) {
      console.log("lets redirect")
      return <Redirect to="/user" />
    }

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
          <Login loginHandler={this.loginHandler}/>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
