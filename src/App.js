import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRegister from './Components/LoginRegister.js';
import MainPage from './Components/MainPage.js';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (userData) => {
    try {
      console.log(userData)
      const response = await axios.post('http://88.200.63.148:8111/login', {
        email: userData.email,
      });

      if (response.data.success) {
        setUser(response.data.user);
        console.log(response)
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route
              path="/"
              element={<LoginRegister onLogin={handleLogin} />}
            />
            <Route
              path="/main"
              element={<MainPage user={user} />}
            />
          </Routes>
      </header>
    </div>
  );
}

export default App;