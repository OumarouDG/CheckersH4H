import './App.css';
import Navbar from "./component/Navbar/Navbar";
import Instructions from "./component/Instructions/Instructions";
import ParticlesComponent from './component/Particles/Particles'; 
import InputField from './component/InputField/InputField';

function App() {
  return (
    <div className="App">
      <ParticlesComponent id="tsparticles" />
      <Navbar></Navbar>
      <header className="App-header">
        <Instructions></Instructions>
      </header>
      <InputField></InputField>
    </div>
  );
}

export default App;
