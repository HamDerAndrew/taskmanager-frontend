import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Signup from '../pages/Signup/Signup';
import About from '../pages/About/About';
import User from '../pages/User/User';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            token: "",
        }
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
                        <User {...props} 
                            loggedIn={this.state.loggedIn} 
                            token={this.state.token}
                            logoutCallback={this.logoutCallback}
                        />
                    )}
                />
                <Route path="*" render={() => (<div>404 not found</div>)} />
            </Switch>
        )
    }
}

export default Routing