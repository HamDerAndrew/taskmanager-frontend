import React from 'react';
import styles from './about.module.css';
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

const About = () => {
    return(
        <div className={styles.aboutBody}>
            <div className={styles.aboutContent}>
                <Navigation />
                <div className={styles.article} >
                    <h2>About this project</h2>
                    <p>With the help of Andrew Mead I built a backend for a taskmanager. I did so by following his great Nodejs Developer course.</p>
                    <p>Since there was no frontend for it, I decided to build my own and chose to do it with React to better my skills.
                        The result of this is what you see here :)
                    </p>
                    <h2>How does it work?</h2>
                    <p>The app is fairly simple. If you already have a user, you sign in and start creating tasks.</p>
                    <p>If you don't have a user, you create one by signing up. Once you have signed up you get a 
                        "Welcome" email. Check your spam filter if you don't get any. You don't have to confirm anything.
                        You are now ready to log in.
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>   
    )
}

export default About