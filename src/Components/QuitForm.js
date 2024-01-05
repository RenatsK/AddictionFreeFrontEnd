import React, { useState, useEffect } from 'react';
import './QuitForm.css';
import axios from 'axios';

const QuitForm = ({ quitEmail, setUpdate}) => {
  const [selectedAddiction, setSelectedAddiction] = useState('');
  const [quitReason, setQuitReason] = useState('');
  const [error, setError] = useState('');
  const [addictionList, setAddictionList] = useState([]);

  useEffect(() => {
    const fetchAddictions = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:8111/user/addictionToSelect', {
        });
      
        if (response.data.success) {
          setAddictionList(response.data.data);
        } else {
          setError('Failed to fetch addictions');
        }
      } catch (error) {
        console.error('Error fetching addictions: ', error);
        setError('Failed to fetch addictions');
      }
    };

    fetchAddictions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
    const StartDate = `${formattedDate} ${formattedTime}`;

    try {
      const response = await axios.post('http://88.200.63.148:8111/user/userAddiction', {
        addictionType: selectedAddiction,
        addictionReason: quitReason,
        email: quitEmail,
        AddictionID: selectedAddiction,
        addictionStartDate: StartDate
      });

      if (response.data.success) {
        
      } else {
        const errorMessage = response.data.message || 'Invalid reason or addiction';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
    }

    window.location.reload();
  };

  const handleReasonChange = (e) => {
    setQuitReason(e.target.value);
  };

  return (
    <div className='quit-form'>
      <h2>Quit Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Addiction: 
          <select
            value={selectedAddiction}
            onChange={(e) => setSelectedAddiction(e.target.value)}
          >
            <option value="">Select Addiction</option>
            {addictionList.map((addiction) => (
              <option key={addiction.AddictionID} value={addiction.AddictionID}>
                {addiction.Type}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quit Reason:
          <input
            type="text"
            value={quitReason}
            onChange={handleReasonChange}
            required
            maxLength="250"
          />
        </label>
        <button>Quit addiction</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default QuitForm;
