import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.status === 'Platinum') {
        setStatusMessage('Access granted. Enjoy your internet!');
        // Redirect to success page or unlock WiFi via backend logic
      } else if (data.status === 'Gold') {
        setStatusMessage('Access denied. Gold users cannot access internet.');
      } else {
        setStatusMessage('Invalid credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('Error connecting to the server.');
    }
  };

  return (
    <div className="App">
      <h2>Login to Access WiFi</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{statusMessage}</p>
    </div>
  );
}

export default App;
