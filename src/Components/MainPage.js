import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  // Placeholder user information (replace with actual user data)
  const user = {
    name: 'John Doe',
    // Add any other user details you need
  };

  const navigate = useNavigate();
  const handleLogout = () => {
        navigate('/');
  };
  
  return (
    <div className="main-page">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <button className="logout-button" onClick={() => handleLogout()}>Log Out</button>
      </nav>

      <div className="content">
        <h1>Welcome, {user.name}!</h1>
        {/* Add content specific to your main page */}
      </div>
    </div>
  );
};

// Example logout function (replace with actual logout logic)
const handleLogout = () => {

};

export default MainPage;