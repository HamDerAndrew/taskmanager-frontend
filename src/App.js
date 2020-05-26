import React from 'react';
import styles from './app.module.css';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Welcome to the task manager app</h1>
      </header>
      <div className={styles.loginbox}>
        <Login />
      </div>
      <Footer />
    </div>
  );
}

export default App;
