import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import Calendar from './Calendar';
<h1>Monthly Calendar</h1>
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Remove StrictMode during development if needed
  // <React.StrictMode>
    <App />
    // <Calendar />
  // </React.StrictMode>
);
