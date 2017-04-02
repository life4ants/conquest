import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';

localStorage.conquestGames = localStorage.conquestGames || JSON.stringify([])

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
