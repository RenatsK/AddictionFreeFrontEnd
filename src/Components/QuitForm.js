import React, { useState, useEffect } from 'react';
import './QuitForm.css';
import axios from 'axios';

const QuitForm = ({ quitEmail }) => {
  const [selectedAddiction, setSelectedAddiction] = useState('');
  const [quitReason, setQuitReason] = useState('');
  const [error, setError] = useState('');
  const [addictionList, setAddictionList] = useState([]);

  useEffect(() => {
    const fetchAddictions = async () => {
      try {
        const response = await axios.get('http://88.200.63.148:28111/user/addictionToSelect', {
        });

      
        if (response.data.success) {
          setAddictionList(response.data.data);
          console.log(response.data);
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

    try {
      const response = await axios.post('http://88.200.63.148:28111/user/userAddiction', {
        addictionType: selectedAddiction,
        addictionReason: quitReason,
        email: quitEmail,
        AddictionID: selectedAddiction
      });

      if (response.data.success) {
        console.log(response.data);
      } else {
        const errorMessage = response.data.message || 'Invalid reason or addiction';
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  const handleReasonChange = (e) => {
    setQuitReason(e.target.value);
  };

  const handleAddictionClick = (a) => {
    console.log(a)
  }

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
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default QuitForm;
