import React, { Component } from 'react';
import styles from './profile.module.css';
import UserProfile from '../../components/UserProfile/UserProfile';
import Footer from '../../components/Footer/Footer';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: this.props.loggedIn
        }
    }

    render() {
        return (
            <div className={styles.profileBody}>
                <div className={styles.profileContent}>
                    <UserProfile 
                        name="Andrew"
                        age="25"
                        email="myemail@email.com"
                        password="supersecretpassword"
                    />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Profile;