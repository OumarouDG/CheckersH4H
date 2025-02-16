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
