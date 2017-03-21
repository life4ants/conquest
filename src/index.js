import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

localStorage.games = localStorage.games || JSON.stringify([])

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
