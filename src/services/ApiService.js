import axios from 'axios';

// Log in request
export const LogIn = (email, password) => {
    const url = 'https://larsen-taskmanager-project.herokuapp.com/users/login'
    return axios.post(url, {
        email,
        password
    })
}

// Create task request
export const CreateTask = (token, description, completed) => {
    const url = 'https://larsen-taskmanager-project.herokuapp.com/tasks'
    const header = { 'Authorization': `Bearer ${token}`}
    return axios.post(url, 
        {
            description,
            completed
        }, 
        { 'headers': header })
}

// Update task request
export const UpdateTask = (taskId, token, description, completed) => {
    const url = `https://larsen-taskmanager-project.herokuapp.com/tasks/${taskId}`
    const header = { 'Authorization': `Bearer ${token}`}
    return axios.patch(url, {
        description,
        completed,
    }, {'headers': header})
}

// Delete task request
export const DeleteTask = (taskId, token) => {
    const url = `https://larsen-taskmanager-project.herokuapp.com/tasks/${taskId}`
    const header = { 'Authorization': `Bearer ${token}`}
    return axios.delete(url, {'headers': header})
}

// Log out request
export const LogOut = (token) => {
    const url = 'https://larsen-taskmanager-project.herokuapp.com/users/logout'
    const header = { 'Authorization': `Bearer ${token}`}
    return axios.post(url, {}, {'headers': header})
}