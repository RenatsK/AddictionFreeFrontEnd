import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import QuitForm from './QuitForm';

const MainPage = () => {

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
        <QuitForm />
      </div>
    </div>
  );
};

export default MainPage;