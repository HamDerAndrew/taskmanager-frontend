import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Task from '../components/User/User';

const Routing = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About} />
            <Route path="/user" component={Task} />
            <Route path="*" render={() => (<div>404 not found</div>)} />
        </Switch>
    )
}

export default Routing