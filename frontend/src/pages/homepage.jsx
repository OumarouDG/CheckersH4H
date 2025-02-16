import React from "react";
import Navbar from "../component/Navbar/Navbar";
import Instructions from "../component/Instructions/Instructions";
import ParticlesComponent from "../component/Particles/Particles"; 
import InputField from "../component/InputField/InputField";

const HomePage = () => {
  return (
    <div className="homepage">
      <ParticlesComponent id="tsparticles" />
      <header className="App-header">
        <Instructions />
      </header>
      <InputField />
    </div>
  );
};

export default HomePage;
