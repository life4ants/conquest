import React, { Component } from 'react';
import Header from './components/header'
import Welcome from './components/welcome'
import Game from './components/game'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './colors.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      phase: 'welcome'
    }
  }

  endGame(){
    this.setState({phase: 'welcome'})
  }

  pickComponent(){
    if (this.state.phase === 'welcome')
      return <Welcome onClick={this.start.bind(this)} />
    else if (this.state.phase === 'playing'){
      return <Game cancel={this.endGame.bind(this)} />
    }
  }

  renderHeader(){
    if (this.state.phase === 'welcome'){
      return <Header phase='setup'/>
    }
  }


  start(){
    if (this.state.phase === 'welcome')
      this.setState({phase: 'playing'})
    else
      this.setState({phase: 'welcome'})
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.pickComponent()}
      </div>
    );
  }
}

export default App;
