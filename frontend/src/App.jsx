import './App.css';
import Navbar from "./component/Navbar/Navbar";
import Instructions from "./component/Instructions/Instructions";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <header className="App-header">
        <Instructions></Instructions>
      </header>
    </div>
  );
}

export default App;
