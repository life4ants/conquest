import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from 'jquery'
import './index.css';

var selectedCountry = [];

var react_compontent = ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.clicker = function(i){
  // react_compontent.setTerritory(i);
  if (selectedCountry[0])
    deselect(selectedCountry[0])
  selectedCountry[0] = i;
  select(i)

}

function select(country)
{
  var id = ".territory"+country;
  if (country === 87 || country === 88)
    $(id).css("stroke-width", "3");
  else
    $(id).css("stroke-width", "30");
}

function deselect(country)
{
  var id = ".territory"+country;
  $(id).css("stroke-width", "0");
}
