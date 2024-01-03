import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Threads.css';

const Threads = () => {
    const navigate = useNavigate();
    const [threadsData, setThreadsData] = useState([]);

    const handleLogout = () => {
        navigate('/');
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://88.200.63.148:8111/threads/allThreads');
            
            if (response.data.success) {
              setThreadsData(response.data.data);
            } else {
              console.error('Failed to fetch threads:', response.data.error);
            }
          } catch (error) {
            console.error('Error fetching threads:', error);
          }
        };
    
        fetchData();
      }, []);

  return (
    <div className="threads-page">
      <nav className="threads-nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout()}>Log Out</button>
      </nav>
      <div className="threads-content">
      <h1 className="threadsh1">Threads</h1>
      <ul className="box">
          {threadsData.map((thread) => (
            <div key={thread.ThreadID} className="thread-item">
              <strong>Topic:</strong> {thread.Topic}<br />
              <strong>Topic Text:</strong> {thread.TopicText}<br />
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Threads;