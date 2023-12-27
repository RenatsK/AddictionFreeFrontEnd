import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginRegister from './Components/LoginRegister.js';
import MainPage from './Components/MainPage.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Routes>
            <Route path="/" element={<LoginRegister />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
      </header>
    </div>
  );
}
export default App;