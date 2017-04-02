import React, { Component } from 'react';
import Header from './components/header'
import Welcome from './components/welcome'
import Game from './components/game'
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './css/colors.css';
import './css/header.css';

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
    localStorage.setItem('conquestGames', JSON.stringify(games))
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
    else {
      document.getElementById('sorry').innerHTML = "<div class='btn-danger'><h4>We're Sorry</h4>\n\
        <p>This website is build with React.js. It looks like you are on a browser that React does not support, \n\
        so this game will not work. Try using a newer browser like chrome or Firefox.</p></div>"
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
