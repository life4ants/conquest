import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Game from './components/game'
import $ from 'jquery'
import './index.css';

var selectedCountry = [];

// var react_compontent =
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

window.modal = function() {
  $("#myModal").modal();
}

window.clicker = function(i){
  if (selectedCountry[1]){
    deselect(selectedCountry[1])
    deselect(selectedCountry[0])
    select(i)
    selectedCountry = [i]
  }
  else if (selectedCountry[0]){
    if(Game.canFight(selectedCountry[0], i)){
      select(i)
      selectedCountry[1] = i
    }
    else
      alert('Those Territories do not border!')
  }
  else{
    selectedCountry[0] = i;
    select(i);
  }

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
