import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Threads.css';
import AppUrl from '../Utils/config';

const ThreadPopup = ({ selectedThread, onClose }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsData, setCommentsData] = useState();
  const userEmail = localStorage.getItem('userEmail');
  
  useEffect(() => {
    GetCommentsData()
  }, [selectedThread, userEmail]);

  const GetCommentsData = async () => {
    try {
      const responseComments = await axios.get(`${AppUrl.AppUrl}/comments/byThread/${selectedThread.ThreadID}`);

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
      const response = await axios.post(`${AppUrl.AppUrl}/comments/addComment`, {
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
        <p className="formatted-text">
          {selectedThread.TopicText}
        </p>
        <div className="comments-container">
          {commentsData &&
          <>
          <h3>Comments:</h3>
          <div className="new-comment-container">
          <textarea
            placeholder="Add a new comment..."
            value={newCommentText}
            className="thread-textarea"
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <button className="post-comment-button" onClick={handleCommentSubmit}>Post Comment</button>
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
  const [isAddThreadPopupOpen, setAddThreadPopupOpen] = useState(false);
  const [newThreadTopic, setNewThreadTopic] = useState('');
  const [newThreadText, setNewThreadText] = useState('');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userEmail');
  };

    const fetchData = async () => {
      try {
        const response = await axios.get(`${AppUrl.AppUrl}/threads/allThreads`);
        if (response.data.success) {
          setThreadsData(response.data.data);
        } else {
          console.error('Failed to fetch threads:', response.data.error);
        }
      } catch (error) {
        console.error('Error fetching threads:', error);
      }
    };

  useEffect(() => {
    fetchData();
  }, []);

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  const handleClosePopup = () => {
    setSelectedThread(null);
  };

  const openAddThreadPopup = () => {
    setAddThreadPopupOpen(true);
  };

  const closeAddThreadPopup = () => {
    setAddThreadPopupOpen(false);
    setNewThreadTopic('');
    setNewThreadText('');
  };

  const addThread = async () => {
    try {
      const response = await axios.post(`${AppUrl.AppUrl}/threads/addThread`, {
        Email: userEmail,
        Topic: newThreadTopic,
        TopicText: newThreadText,
      });

      if (response.data.success) {
        fetchData();
        closeAddThreadPopup();
      } else {
        console.error('Failed to add thread:', response.data.error);
      }
    } catch (error) {
      console.error('Error adding thread:', error);
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    else{
      return text;
    }
  }

  return (
    <div className="threads-page">
      <nav className="nav-bar">
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
        <button className="add-thread-button" onClick={openAddThreadPopup}>
          Add New Thread
        </button>
        <ul className="box">
          {threadsData.map((thread) => (
            <div
              key={thread.ThreadID}
              className="thread-item"
              onClick={() => handleThreadClick(thread)}
            >
              <strong>Topic:</strong> {thread.Topic}
              <br />
              <p className="formatted-text">
                {truncateText(thread.TopicText, 1000)}
              </p>
              <hr />
            </div>
          ))}
        </ul>
  
        {selectedThread && (
          <ThreadPopup selectedThread={selectedThread} onClose={handleClosePopup} />
        )}
      </div>

        {isAddThreadPopupOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-button" onClick={closeAddThreadPopup}>X</button>
              <h2>Add New Thread</h2>
              <div className="new-thread-container">
                <label>Topic:</label>
                <input
                  placeholder="Let's talk about..."
                  type="text"
                  id="newThreadTopic"
                  value={newThreadTopic}
                  onChange={(e) => setNewThreadTopic(e.target.value)}
                  className="new-thread-input"
                />
                <label htmlFor="newThreadText">Text:</label>
                <textarea
                  placeholder="Enter some text here..."
                  id="newThreadText"
                  value={newThreadText}
                  onChange={(e) => setNewThreadText(e.target.value)}
                  className="thread-textarea"
                ></textarea>
                <button onClick={addThread} className="new-thread-button">Add Thread</button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Threads;
