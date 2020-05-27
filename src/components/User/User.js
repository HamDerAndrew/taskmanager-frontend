import React, { Component } from 'react';

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        let tasks = [
            {
                id: 1,
                description: "Let's develop something",
                completed: "false"
            },
            {
                id: 2,
                description: "Let's make React Router work",
                completed: "false"
            }
        ]
        this.setState({tasks: tasks})
    }

    render() {
        return(
            <div>
            <h1>Welcome to your tasks</h1>
            <p>These are all of your tasks</p>
            {this.state.tasks.map((item) => (
                <li key={item.id}> 
                    Task: {item.description} - Completed: {item.completed}
                </li>
            ))}
            </div>
        )
    }
}

export default Task