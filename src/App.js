import React, { Component } from 'react';
import Header from './components/header'
import Welcome from './components/welcome'
import Game from './components/game'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './colors.css';
import './header.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      phase: 'welcome',
      id: 'none',
      games: JSON.parse(localStorage.conquestGames)
    }
  }

  cancel(){
    this.setState({phase: 'welcome', id: 'none', games: JSON.parse(localStorage.conquestGames)})
  }

  deleteGame(game){
    console.log('delete game',game)
    let games = JSON.parse(localStorage.conquestGames)
    games.splice(game, 1)
    localStorage.setItem('games', JSON.stringify(games))
    this.setState({games: games})
  }

  pickComponent(){
    if (this.state.phase === 'welcome')
      return (<Welcome
        games={this.state.games}
        newGame={() => this.start()}
        playGame={(i) => this.playGame(i)}
        deleteGame={(i) => this.deleteGame(i)}/>)
    else if (this.state.phase === 'playing'){
      return <Game cancel={() => this.cancel()} gameId={this.state.id} />
    }
  }

  playGame(id){
    this.setState({phase: 'playing', id: id})
  }

  renderHeader(){
    if (this.state.phase === 'welcome'){
      return <Header phase='setup'/>
    }
  }

  start(){
    this.setState({phase: 'playing'})
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
