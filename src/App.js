import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import LoginRegister from './Components/LoginRegister.js';
import MainPage from './Components/MainPage.js';
import Threads from './Components/Threads.js';
import Library from './Components/Library.js';
import Chat from './Components/Chat.js';
import axios from 'axios';
import AppUrl from './Utils/config.js';

function App() {
  const [user, setUser] = useState(null);
  const userEmail = localStorage.getItem('userEmail');
  const [showLoginRegister, setShowLoginRegister] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setShowLoginRegister(!userEmail);
  }, [userEmail, location.pathname]);

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(`${AppUrl.AppUrl}/login`, {
        email: userData.email,
      });

      if (response.data.success) {
        setUser(response.data.user);
        console.log(userEmail)
      } else {
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="App">
      {showLoginRegister ? (
        <LoginRegister onLogin={handleLogin} />
      ) : (
        <header className="App-header">
          <Routes>
            <Route path="/" element={<LoginRegister onLogin={handleLogin} />} />
            <Route path="/main" element={<MainPage user={user} />} />
            <Route path="/threads" element={<Threads user={user} />} />
            <Route path="/library" element={<Library user={user} />} />
            <Route path="/chat" element={<Chat user={user} />} />
          </Routes>
        </header>
      )}
    </div>
  );
}
export default App;