import { Component } from 'react';

class LoginService extends Component {
    constructor(props) {
        super(props)
    }
    
    loginRequest = (url, email, password) => {
        console.log("we did it")
    }
}

export default new LoginService();