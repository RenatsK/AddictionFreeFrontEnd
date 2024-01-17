import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import QuitForm from './QuitForm';
import Stopwatch from './Stopwatch';
import axios from 'axios';
import AppUrl from '../Utils/config';

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [quitReason, setQuitReason] = useState(null);
  const [addictionType, setAddictionType] = useState(null);

  const [email] = useState(localStorage.getItem('userEmail'))

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userEmail');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${AppUrl.AppUrl}/user/userByEmail`, {
          params: {
            email: email,
          },
        });
        setQuitReason(response.data.data[0].Reason);
        setAddictionType(response.data.data[0].type)

      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
    fetchUserNameData();
  }, [quitReason, email]);
  
  const fetchUserNameData = async () => {
    try {
      const response = await axios.get(`${AppUrl.AppUrl}/user/userNameByEmail`, {
        params: {
          email: email,
        },
      });
      setUserData(response.data.data[0].Name);

    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  return (
    <div className="main-page">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout() }>Log Out</button>
      </nav>
      <div className="content">
      <h1 className='welcome'>Nice to see you, {userData}!</h1>
      <p className='reason'>Remember why you quit {addictionType}: {quitReason}</p>
      <div className='box'>
        <QuitForm quitEmail={email} />
        <Stopwatch timerEmail={email}/>
      </div>
      </div>
    </div>
  );
};

export default MainPage;