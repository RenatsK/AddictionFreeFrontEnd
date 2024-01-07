import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Stopwatch.css';

const Stopwatch = ({ timerEmail }) => {
  const [startDate, setStartDate] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);

  useEffect(() => {
    const fetchStartDate = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8111/user/userByEmail', {
          params: {
            email: timerEmail,
          },
        });
        setStartDate(response.data.data[0].StartDate);
      } catch (err) {
        console.error('Error fetching start date:', err);
      }
    };

    fetchStartDate();
  }, [timerEmail, elapsedTime]);

  useEffect(() => {
    if (startDate) {
      const intervalId = setInterval(() => {
        const currentDate = new Date();
        const startDateObject = new Date(startDate);

        const elapsedMilliseconds = currentDate - startDateObject;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;

        setElapsedTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startDate]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const formattedDateTime = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    return formattedDateTime;
  };

  const handlePostRequest = async () => {
    try {
      const currentDateTime = getCurrentDateTime();

      const response = await axios.post('http://88.200.63.148:8111/user/stopwatchUpdate', {
        email: timerEmail,
        currentDateTime: currentDateTime,
      });

      if (response.data.success) {

      } else {
        console.error('Error in post request:', response.data.message);
      }
    } catch (error) {
      console.error('Error in post request:', error);
    }
  };

  return (
    <div className="stopwatch">
      <label className="stopwatch-label">You are addiction free for:</label>
      <div className="stopwatch-display">
        <p>{elapsedTime !== null ? elapsedTime : '00:00:00'}</p>
      </div>
      <button className="failedButton" onClick={handlePostRequest}> I failed </button>
    </div>
  );
};

export default Stopwatch;
