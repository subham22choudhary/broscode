import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Subham- Custom script for fav-tab message
function changeTabText(newText) {
  document.title = newText;
}

document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    changeTabText("We miss you!");
  } else {
    changeTabText("Welcome Back!");
  }
});


reportWebVitals();
