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
      phase: 'welcome',
      id: 'none'
    }
  }

  cancel(){
    this.setState({phase: 'welcome', id: 'none'})
  }

  pickComponent(){
    if (this.state.phase === 'welcome')
      return <Welcome games={JSON.parse(localStorage.games)} newGame={() => this.start()} playGame={(i) => this.playGame(i)} />
    else if (this.state.phase === 'playing'){
      return <Game cancel={() => this.cancel()} gameId={this.state.id} />
    }
  }

  renderHeader(){
    if (this.state.phase === 'welcome'){
      return <Header phase='setup'/>
    }
  }

  playGame(id){
    this.setState({phase: 'playing', id: id})
  }

  start(){
    this.setState({phase: 'playing'})
  }

  render() {
    console.log('app rendered')
    return (
      <div className="App">
        {this.renderHeader()}
        {this.pickComponent()}
      </div>
    );
  }
}

export default App;
