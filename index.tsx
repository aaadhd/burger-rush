
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const stageElement = document.getElementById('stage');
if (!stageElement) {
  throw new Error("Could not find stage element to mount to");
}

const root = ReactDOM.createRoot(stageElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
