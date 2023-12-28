import React, { useState } from 'react';
import './QuitForm.css';

const QuitForm = () => {
  const [selectedAddiction, setSelectedAddiction] = useState('');
  const [quitReason, setQuitReason] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Selected Addiction:', selectedAddiction);
    console.log('Quit Reason:', quitReason);
  };

  const handleReasonChange = (e) => {
    setQuitReason(e.target.value); // Fix: Use setQuitReason instead of setReason
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
            required
          >
            {/* Replace with options loaded from the database */}
            <option value="">Select Addiction</option>

            {/* Add more options as needed */}
          </select>
        </label>
        <label>
          Quit Reason:
          <input
            type="text"
            value={quitReason}
            onChange={handleReasonChange}
            required
            maxLength="100" // Set a maximum length for the input
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuitForm;
