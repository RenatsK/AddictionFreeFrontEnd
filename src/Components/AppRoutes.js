import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginRegister from './LoginRegister';
import MainPage from './MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
};

export default AppRoutes;