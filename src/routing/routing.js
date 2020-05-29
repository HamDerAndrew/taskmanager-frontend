import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import About from '../pages/About/About';
import User from '../components/User/User';

class Routing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            token: "set"
        }
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
                        />
                    )}
                />
                <Route path="/about" component={About} />
                <Route 
                    path="/user/" 
                    render={(props) => (
                        <User {...props} 
                            loggedIn={this.state.loggedIn} 
                            token={this.state.token}
                        />
                    )}
                />
                <Route path="*" render={() => (<div>404 not found</div>)} />
            </Switch>
        )
    }
}

export default Routing