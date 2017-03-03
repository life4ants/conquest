import React, { Component } from 'react';
import Header from './components/header'
import Welcome from './components/welcome'
import Setup from './components/setup'
import Board from './components/board'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      phase: 'welcome',
      player1: {name: '', color: ''},
      player2: {name: '', color: ''},
      setupError: ''
    }
  }

  pickComponent(){
    if (this.state.phase === 'welcome')
      return <Welcome onClick={this.start.bind(this)}/>
    else if (this.state.phase === 'setup'){
      return (<Setup onClick={this.setColor.bind(this)}
                  onChange={this.setName.bind(this)} error={this.state.setupError}
                  color={[this.state.player1.color, this.state.player2.color]}
                  cancel={this.start.bind(this)} newGame={this.newGame.bind(this)} /> )
    }
    else if (this.state.phase === 'playing'){
      return <Board />
    }
  }

  start(){
    if (this.state.phase === 'welcome')
      this.setState({phase: 'setup'})
    else if (this.state.phase === 'setup')
      this.setState({phase: 'welcome'})
  }

  newGame(){
    if (this.state.player1.name !== '' &&
        this.state.player2.name !== '' &&
        this.state.player1.color !== '' &&
        this.state.player2.color !== ''
      ){
      this.setState({phase: 'playing', setupError: ''})
      console.log('good')
    }
    else{
      this.setState({setupError: 'please enter names and select colors for both players'})
      console.log('bad')
    }
  }

  setColor(id, color){
    if (id === 'player1'){
      var player = this.state.player1
      player.color = color
      this.setState({player1: player})
    }
    else if (id === 'player2'){
      player = this.state.player2
      player.color = color
      this.setState({player2: player})
    }
  }

  setName(e){
    e.preventDefault()
    if (e.target.id === 'player1'){
      var player = this.state.player1
      player.name = e.target.value
      this.setState({player1: player})
    }
    else if (e.target.id === 'player2'){
      player = this.state.player2
      player.name = e.target.value
      this.setState({player2: player})
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.pickComponent()}
      </div>
    );
  }
}

export default App;
