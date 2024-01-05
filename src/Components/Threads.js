import React, { useEffect, useState } from 'react';
import { parsePath, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Threads.css';

const ThreadPopup = ({ selectedThread, onClose }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsData, setCommentsData] = useState();
  const userEmail = localStorage.getItem('userEmail');
  
  useEffect(() => {
    GetCommentsData()
  }, [selectedThread, userEmail]);

  const GetCommentsData = async () => {
    try {
      const responseComments = await axios.get(`http://88.200.63.148:8111/comments/byThread/${selectedThread.ThreadID}`);

      if (responseComments.data.success) {
        setCommentsData(responseComments.data.data);
      } else {
        console.error('Failed to fetch threads:', responseComments.data.error);
      }
    } catch (error) {
      console.error('Error fetching threads:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post('http://88.200.63.148:8111/comments/addComment', {
        Email: userEmail,
        ThreadID: selectedThread.ThreadID,
        Text: newCommentText
      });
      if (response.data.success) {
        GetCommentsData();
        setNewCommentText('');
      } else {
        console.error('Failed to add comment:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{selectedThread.Topic}</h2>
        <p>
          {selectedThread.TopicText}
        </p>
        <div className="comments-container">
          {commentsData &&
          <>
          <h3>Comments:</h3>
          <div className="new-comment-container">
          <input
            placeholder="Add a new comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Post Comment</button>
        </div>
          {commentsData.map((comment) => (
            <div key={comment.CommentID} className="comment-item">
              <div className="user-info">
                <strong>{comment.Name} {comment.Surname}</strong>
              </div>
              <div className="comment-text">
                <p className="comment-p">{comment.Text}</p>
              </div>
            </div>
            ))}
          </>}
        </div>
      </div>
    </div>
  );
};

const Threads = () => {
  const navigate = useNavigate();
  const [threadsData, setThreadsData] = useState([]);
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
  };

  const handleClosePopup = () => {
    setSelectedThread(null);
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
          <ThreadPopup selectedThread={selectedThread} onClose={handleClosePopup}/>
        )}
      </div>
    </div>
  );
};

export default Threads;
