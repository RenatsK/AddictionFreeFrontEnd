import React, { useState } from 'react';
import './App.css';
import LoginRegister from './Components/LoginRegister.js';
import MainPage from './Components/MainPage.js';


function App() {

  return (
    <div className="App">
    <header className="App-header">
      <LoginRegister />
      <MainPage />
    </header>
  </div>
  );
}

export default App;