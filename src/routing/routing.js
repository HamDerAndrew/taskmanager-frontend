import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login/Login';
import About from '../pages/About/About';
import Task from '../components/User/User';

const Routing = () => {
    return (
        <Switch>
            <Route 
            exact path="/" component={Login}/>
            <Route path="/about" component={About} />
            <Route path="/user/:id" component={Task} />
            <Route path="*" render={() => (<div>404 not found</div>)} />
        </Switch>
    )
}

export default Routing