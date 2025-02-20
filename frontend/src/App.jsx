import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import HomePage from './pages/homepage';
import ModernPage from './pages/modernpage'; 
import InfoPage from './pages/infopage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<ModernPage />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;
