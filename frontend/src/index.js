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
