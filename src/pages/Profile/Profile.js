import React, { Component } from 'react';
import styles from './profile.module.css';
import axios from 'axios';
import UserProfile from '../../components/UserProfile/UserProfile';
import Footer from '../../components/Footer/Footer';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            age: '',
            email: '',
            password: '',
            formError: false,
            errName: '',
            errAge: '',
            errEmail: '',
            errPassword: '',
            errNetwork: '',
            isEditToggled: false
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleEdit = (type) => {
        console.log("Toggle Edit")
        this.setState(prevState => ({
            isEditToggled: !this.state.isEditToggled
        }))
    }

    cancelUpdate = (event) => {
        event.preventDefault();
        this.setState({
            isEditToggled: false
        })
    }

    updateUser = (event) => {
        const { name, age, email, password } = this.state;
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/user'
        const header = { 'Authorization': `Bearer ${this.props.token}`}
        event.preventDefault();
        axios.patch(url, {
            name,
            age,
            email,
            password
        }, {'headers': header})
        .then((response) => {
            console.log(response)
            this.setState({
                isEditToggled: false,
                formError: false
            })
        })
        .catch((error) => {
            if(error.response === undefined) {
                this.setState({
                    formError: true,
                    errNetwork: 'Network error.'
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

    readUser = () => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/user'
        const header = { 'Authorization': `Bearer ${this.props.token}`}
        axios.get(url, { 'headers': header })
        .then((response) => {
            const { name, age, email } = response.data;
            this.setState({
                name,
                age,
                email
            })
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.readUser();
    }

    render() {
        const { name, age, email, password, isEditToggled, formError, errNetwork, errName, errAge, errEmail, errPassword } = this.state;
        return (
            <div className={styles.profileBody}>
                <div className={styles.profileContent}>
                    <UserProfile 
                        name={name}
                        age={age}
                        email={email}
                        password={password}
                        active={isEditToggled}
                        formError={formError}
                        errNetwork={errNetwork}
                        errName={errName}
                        errAge={errAge}
                        errEmail={errEmail}
                        errPassword={errPassword}
                        handleChange={this.handleChange}
                        toggleEdit={this.toggleEdit}
                        updateUser={this.updateUser}
                        cancelUpdate={this.cancelUpdate}
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile;