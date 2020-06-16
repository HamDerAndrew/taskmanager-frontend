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
            age: 0,
            email: '',
            password: '',
            isEditToggled: false
        }
    }

    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleEdit = () => {
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
        console.log(this.props.token)
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
        })
        .catch((error) => {
            console.log(error.response)
        })
        this.setState({
            isEditToggled: false
        })
    }

    render() {
        const { name, age, email, password, isEditToggled } = this.state;
        return (
            <div className={styles.profileBody}>
                <div className={styles.profileContent}>
                    <UserProfile 
                        name={name}
                        age={age}
                        email={email}
                        password={password}
                        active={isEditToggled}
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