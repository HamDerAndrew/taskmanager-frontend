import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the task manager app</h1>
      </header>
      <div className="login-box">
        <form>
          <input type="text" name="username" />
          <input type="password" name="password" />
        </form>
      </div>
    </div>
  );
}

export default App;
