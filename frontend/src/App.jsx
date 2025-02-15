import React from 'react';
import './App.css';
import ParticlesComponent from './component/Particle/Particle'; // Import your Particles component

function App() {
  return (
    <div className="App">
      {/* Add the Particles component to render the background effect */}
      <ParticlesComponent id="tsparticles" />

      <header className="App-header">
        <h1>My React App with Particles!</h1>
        <p>
          Welcome to my app with a particle background.
        </p>
      </header>
    </div>
  );
}

export default App;
