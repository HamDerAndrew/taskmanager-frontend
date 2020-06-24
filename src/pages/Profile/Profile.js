import React, { Component } from 'react';
import styles from './profile.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import UserProfile from '../../components/UserProfile/UserProfile';
import Footer from '../../components/Footer/Footer';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fetchingUser: true,
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    toggleEdit = () => {
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

    deleteUser = (event) => {
        const url = 'https://larsen-taskmanager-project.herokuapp.com/users/user'
        const header = { 'Authorization': `Bearer ${this.props.token}`}
        event.preventDefault()
        if (window.confirm('Are you sure you want to delete your account?')) {
            console.log("delete account")
            axios.delete(url, {'headers': header})
            .then((response) => {
                console.log("user deleted - ", response)
                this.sendDeletion()
                this.props.history.push("/")
            })
            .catch((error) => {
                console.log("Error deleting user. ", error)
            })
        } else {
            console.log("dont delete account")
        }
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
                email,
                fetchingUser: false
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    sendDeletion = () => {
        this.props.deletionCallback({loggedIn: false, token: ''})
    }

    componentDidMount() {
        this.readUser();
    }

    render() {
        const { name, age, email, password, isEditToggled, formError, errNetwork, errName, errAge, errEmail, errPassword } = this.state;
        return (
            <div className={styles.profileBody}>
                <div className={styles.profileContent}>
                    <div className={styles.taskNav}>
                        <Link className={styles.linkText} to="/user">Back to tasks</Link>
                    </div>
                    {
                        this.state.fetchingUser
                        ?
                        <div className={styles.loadContainer}> 
                            <Spinner fadeIn="none" name="folding-cube" color="blue" className={styles.showSpin}/>
                        </div>
                        :
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
                            deleteUser={this.deleteUser}
                            cancelUpdate={this.cancelUpdate}
                        />
                    }
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile;