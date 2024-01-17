import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Chat.css';

const Chat = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
        localStorage.removeItem('userEmail');
      };  

  return (
    <div className="chat">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout()}>
          Log Out
        </button>
      </nav>
      <div className="ChatContentContainer">
        <div className="ChatContentLeft">
          <h2>Users</h2>
        </div>
        <div className="ChatContentDivider"></div>
        <div className="ChatContentRight">
          <h2>Chat</h2>
        </div>
      </div>
    </div>
  );
};

export default Chat;