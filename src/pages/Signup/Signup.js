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
            console.log(response.data)
            console.log("User created")
        })
        .catch((error) => {
            console.log(error)
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
                </div>
                <Footer />
            </div>
        )
    }
}

export default Signup;