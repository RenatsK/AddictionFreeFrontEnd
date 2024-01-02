import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import QuitForm from './QuitForm';
import Stopwatch from './Stopwatch';
import axios from 'axios';

const MainPage = ({ user }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [email] = useState(localStorage.getItem('userEmail'))

  const handleLogout = () => {
        navigate('/');
  };

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8111/user/userByEmail', {
          params: {
            email: email,     
          },
        });

        setUserData(response.data.data[0].Name);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  },);
  
  return (
    <div className="main-page">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <button className="logout-button" onClick={() => handleLogout()}>Log Out</button>
      </nav>
      <div className="content">
      <h1 className='welcome'>Welcome, {userData}!</h1>
      <div className='box'>
        <QuitForm quitEmail={email}/>
        <Stopwatch timerEmail={email}/>
      </div>
        
      </div>
    </div>
  );
};

export default MainPage;