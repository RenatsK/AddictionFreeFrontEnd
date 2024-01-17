import React, { useState, useEffect } from 'react';
import { parsePath, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Library.css';
import AppUrl from '../Utils/config';

const LibraryItemPopup = ({ onClose, selectedItem }) => (
  <div className="popup-overlay">
    <div className="popup-content">
      <button className="close-button" onClick={onClose}>X</button>
      <h2>{selectedItem.Topic}</h2>
      <p className="formatted-text">
        {selectedItem.Text}
      </p>
    </div>
  </div>
);

const Library = () => {
  const navigate = useNavigate();
  const [libraryData, setLibraryData] = useState();
  const [selectedLibraryItem, setSelectedLibraryItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLibraryData = async () => {
    try {
      const response = await axios.get(`${AppUrl.AppUrl}/library/allLibrary`);
      setLibraryData(response.data.data);
    } catch (error) {
      console.error('Error fetching library data:', error);
    }
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('userEmail');
  };

  const openLibraryItemPopup = (libraryItem) => {
    setSelectedLibraryItem(libraryItem);
  };

  const closeLibraryItemPopup = () => {
    setSelectedLibraryItem(null);
  };

  useEffect(() => {
    fetchLibraryData();
  }, []);

  
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLibraryData = libraryData?.filter((library) => {
    const searchText = library.Topic.toLowerCase();
    return searchText.includes(searchTerm.toLowerCase());
  }) || [];
  

  return (
    <div className="library-page">
      <nav className="nav-bar">
        <a href="/main">HOME</a>
        <a href="/threads">THREADS</a>
        <a href="/chat">CHAT</a>
        <a href="/library">LIBRARY</a>
        <button className="logout-button" onClick={() => handleLogout()}>
          Log Out
        </button>
      </nav>
      <div className="library-content">
        <h1 className="libraryh1">Library</h1>
        {filteredLibraryData.length > 0 ? (
          <ul className="box">
          <input
            type="text"
            placeholder="Search by topic..."
            value={searchTerm}
            className="searchbar-library"
            onChange={handleSearch}
          />
            {filteredLibraryData.map((library) => (
              <div
                key={library.LibPostID}
                className="library-item"
                onClick={() => openLibraryItemPopup(library)}
              >
                <strong>Topic:</strong> {library.Topic}
                <br />
                <div className="formatted-text">
                  <p>{truncateText(library.Text, 1000)}</p>
                </div>
                <hr />
              </div>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      {selectedLibraryItem && (
        <LibraryItemPopup onClose={closeLibraryItemPopup} selectedItem={selectedLibraryItem} />
      )}
    </div>
  );
};

export default Library;