import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import About from '../pages/About/About';
import User from '../pages/User/User';
import Profile from '../pages/Profile/Profile';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            token: "",
        }
    }

    deletionCallback = (childData) => {
        this.setState({
            loggedIn: childData.loggedIn,
            token: childData.token
        })
    }

    logoutCallback = (childData) => {
        this.setState({
            loggedIn: childData.loggedIn,
            token: childData.token
        })
    }

    loginCallback = (childData) => {
        this.setState({
            loggedIn: childData.loggedIn,
            token: childData.token
        })
    }

    render() {
        return (
            <Switch>
                <Route 
                    exact path="/" 
                    render={(props) => (
                        <Login {...props}
                        loggedIn={this.state.loggedIn}
                        token={this.state.token}
                        loginCallback={this.loginCallback}
                        />
                    )}
                />
                <Route path="/signup" component={Signup} />
                <Route path="/about" component={About} />
                <Route 
                    path="/user/" 
                    render={(props) => (
                        this.state.loggedIn 
                        ?
                        <User {...props} 
                            loggedIn={this.state.loggedIn} 
                            token={this.state.token}
                            logoutCallback={this.logoutCallback}
                        />
                        :
                        <Redirect to="/" />
                    )}
                />
                <Route 
                    path="/profile"
                    render={(props) => (
                        this.state.loggedIn
                        ?
                        <Profile {...props} 
                            loggedIn={this.state.loggedIn}
                            token={this.state.token}
                            deletionCallback={this.deletionCallback}
                        />
                        :
                        <Redirect to="/" />
                    )}
                />
                <Route path="*" render={() => (<div>404 not found</div>)} />
            </Switch>
        )
    }
}

export default Routing