import React, { useState } from 'react';
import './QuitForm.css';
import axios from 'axios';

const QuitForm = ({quitEmail}) => {
  const [selectedAddiction, setSelectedAddiction] = useState('');
  const [quitReason, setQuitReason] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://88.200.63.148:8111/user/userAddiction', {
        addictionReason: quitReason,
        email: quitEmail
        
      });

      if (response.data.success) {
        console.log(response.data);
      } else {
        const errorMessage = response.data.message || 'Invalid reason or addiction';
        setError(errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuitForm;