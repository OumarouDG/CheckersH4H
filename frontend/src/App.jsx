import './App.css';
import Navbar from "./component/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <header className="App-header">
        <h1>Welcome to Your React Chrome Extension!</h1>
        <p>This is a simple Chrome extension built with React.</p>
      </header>
    </div>
  );
}

export default App;
