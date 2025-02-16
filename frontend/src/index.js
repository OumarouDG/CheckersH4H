<<<<<<< Updated upstream
// index.js

import React from "react";
import ReactDOM from "react-dom/client"; // Use the client version of react-dom
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App"; // Your main App component

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root element
root.render(
  <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
    <App />
  </BrowserRouter>
);
=======
import React from 'react';
import ReactDOM from 'react-dom/client'; // Newer API for React 18+
import './index.css'; // Add any global styles you need
import App from './App'; // Import your main App component
import reportWebVitals from './reportWebVitals'; // Optional: for performance monitoring

const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root div
root.render(
  <React.StrictMode>
    <App /> {/* This is your main App component */}
  </React.StrictMode>
);

// For performance tracking (optional)
reportWebVitals();
>>>>>>> Stashed changes
