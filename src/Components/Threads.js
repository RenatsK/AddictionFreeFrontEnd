import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Threads.css';

const ThreadPopup = ({ selectedThread, commentsData, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{selectedThread.Topic}</h2>
        <p>
          <strong>Topic Text:</strong> {selectedThread.TopicText}
        </p>
        <div>
          <h3>Comments:</h3>
          {commentsData.map((comment) => (
            <p key={comment.CommentID}>{comment.CommentText}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

const Threads = () => {
  const navigate = useNavigate();
  const [threadsData, setThreadsData] = useState([]);
  const [commentsData, setCommentsData] = useState();
  const [selectedThread, setSelectedThread] = useState(null);

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

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    GetCommentsData(thread)
  };

  const handleClosePopup = () => {
    setSelectedThread(null);
  };

  const GetCommentsData = async (thread) => {
    console.log(thread.ThreadID)
    try {
      const responseComments = await axios.get(`http://88.200.63.148:8111/comments/byThread?ThreadId=${thread.ThreadID}`);

      if (responseComments.data.success) {
        console.log(responseComments)
        setCommentsData(responseComments.data.data);
      } else {
        console.error('Failed to fetch threads:', responseComments.data.error);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  return (
    <div className="threads-page">
      <nav className="threads-nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout()}>
          Log Out
        </button>
      </nav>
      <div className="threads-content">
        <h1 className="threadsh1">Threads</h1>
        <ul className="box">
          {threadsData.map((thread) => (
            <div
              key={thread.ThreadID}
              className="thread-item"
              onClick={() => handleThreadClick(thread)}
            >
              <strong>Topic:</strong> {thread.Topic}<br />
              {thread.TopicText}<br />
              <hr />
            </div>
          ))}
        </ul>
        {selectedThread && (
          <ThreadPopup selectedThread={selectedThread} commentsData={commentsData} onClose={handleClosePopup} />
        )}
      </div>
    </div>
  );
};

export default Threads;
