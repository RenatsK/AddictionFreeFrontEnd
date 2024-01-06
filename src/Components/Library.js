import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Library.css';

const Library = () => {
  const [libraryData, setLibraryData] = useState();

  const fetchLibraryData = async () => {
    try {
      const response = await axios.get('http://88.200.63.148:8111/library/allLibrary');
      setLibraryData(response.data.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    }
  };

  useEffect(() => {

    fetchLibraryData();
  }, []);

  return (
    <div className="library-container">
      <h1>Library</h1>
      {libraryData&&
      <>
      {libraryData.map((library) => (
        <div key={library.LibPostID} className="library-item">
          <h2>{library.Topic}</h2>
          <p>{library.Text}</p>
        </div>
      ))}
      </>}
    </div>
  );
};

export default Library;
