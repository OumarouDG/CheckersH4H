import React from 'react';
<<<<<<< Updated upstream
import './App.css';
import Navbar from "./component/Navbar/Navbar";
import Instructions from "./component/Instructions/Instructions";
import ParticlesComponent from './component/Particles/Particles'; 
import InputField from './component/InputField/InputField';
=======
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import HomePage from './pages/homepage'; // Ensure file path is correct
import ModernPage from './pages/modernpage'; // Ensure file path is correct
import InfoPage from './pages/infopage'
>>>>>>> Stashed changes

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news" element={<ModernPage />} />
        <Route path= "/info" element = {<InfoPage/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
