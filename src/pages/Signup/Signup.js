import React, { Component } from 'react';
import styles from './signup.module.css';
import Navigation from '../../components/Navigation/Navigation';
import SignupForm from '../../components/SignupForm/SignupForm';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state ={
            name: '',
            age: '',
            email: '',
            password: '',
            formError: false,
            errName: '',
            errAge: '',
            errEmail: '',
            errPassword: '',
            errNetwork: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    }

    handleSubmit = (event) => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/'
        const { name, age, email, password } = this.state
        event.preventDefault()
        axios.post(url, {
            name,
            age,
            email,
            password
        })
        .then((response) => {
            alert("Your user has been created successfully :)")
            this.props.history.push("/")
        })
        .catch((error) => {
            if(error.response === undefined) {
                this.setState({
                    formError: true,
                    errNetwork: 'Network error.'
                })
            } else if (error.response.data.errmsg) {
                /* Handling Mongoose 'E11000 duplicate key error collection'.
                ** This only occurs if an email already exists, which returns a different Error object and
                ** therefore it is handled in this 'else if' statement. It feels hacky, but this is the solution so far
                */
                this.setState({
                    formError: true,
                    errEmail: 'Email already exists'
                })
            } else {
                const { name = {}, age = {}, email = {}, password = {} } = error.response.data.errors
                this.setState({
                    formError: true,
                    errName: name.message,
                    errAge: age.message,
                    errEmail: email.message,
                    errPassword: password.message,
                    errNetwork: ''
                })
            }
        })
    }

    render() {
        return (
            <div className={styles.signupBody}>
                <div className={styles.signupContent}>
                    <Navigation />
                    <SignupForm 
                        name={this.state.name}
                        age={this.state.age}
                        email={this.state.email}
                        password={this.state.password}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                    />
                    <div className={`${styles.errorContainer} ${this.state.formError ? styles.showError : ''}`}>
                        <p>{this.state.errNetwork}</p>
                        <p>{this.state.errName}</p>
                        <p>{this.state.errAge}</p>
                        <p>{this.state.errEmail}</p>
                        <p>{this.state.errPassword}</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Signup;