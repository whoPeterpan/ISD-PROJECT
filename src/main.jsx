import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

// Mount the main dashboard inside the HTML root element.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
