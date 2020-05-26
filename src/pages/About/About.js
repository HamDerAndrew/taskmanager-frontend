import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';

const About = () => {
    return(
        <div>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
            </ul>
            <h1>About this project</h1>
            <p>With the help of Andrew Mead I build a backend for a taskmanager. I did so by following his great Nodejs Developer course.</p>
            <p>Since there was no frontend for it, I decided to build my own and try and do it with React.</p>
            <Footer></Footer>
        </div>   
    )
}

export default About