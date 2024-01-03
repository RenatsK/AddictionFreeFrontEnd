import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Threads.css';

const Threads = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
      };

  return (
    <div className="threads-page">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout()}>Log Out</button>
      </nav>
      <div className="threads-content">
      </div>
    </div>
  );
};

export default Threads;
