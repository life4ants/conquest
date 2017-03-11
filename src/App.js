import React, { Component } from 'react';
import Header from './components/header'
import Welcome from './components/welcome'
import Setup from './components/setup'
import Board from './components/board'
import Colors from './components/colors'
import Game from './components/game'
import Footer from './components/footer'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './colors.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      phase: 'welcome',
      player1: {name: 'Andy', color: Colors[4], id: 4},
      player2: {name: 'Peter', color: Colors[7], id: 7},
      turnIndex: 0,
      setupError: '',
      header: 'welcome',
      reserves: '',
      owners: ''
    }
  }

  blow(){
    document.getElementById('wrapper').innerHTML = '';
  }

  changePlayer(){
    this.setState({phase: 'setup', header: 'welcome'})
    window.scrollTo(0, 0)
  }

  endTurn(){
    this.state.turnIndex === 0 ? this.setState({turnIndex: 1}) : this.setState({turnIndex: 0});
  }

  getPlayer(){
    var i = this.state.turnIndex
    if (i === 0)
      return this.state.player1
    else if (i === 1)
      return this.state.player2
  }

  fillTerritories(){
    let obj1 = Array(91)
    let obj2 = Array(91)
    for (let i=1; i<91; i++){
      obj1[i] = i
      if (Game.pacific.includes(i))
        obj2[i] = 10
      else if (Game.alantic.includes(i))
        obj2[i] = 11
      else if (Game.gulf.includes(i))
        obj2[i] = 12
    }
    this.setState({reserves: obj1, owners: obj2})
  }

  initializeTerritories(){
    var player1 = Math.floor(Math.random() * 45) + 1;
    var player2 = Math.floor(Math.random() * 45) + 46;
    var obj = Array(91);
    obj[player1] = this.state.player1.id
    obj[player2] = this.state.player2.id
    this.setState({owners: obj})
    var obj2 = Array(91)
    obj2[player1] = [10,5]
    obj2[player2] = [8, 3]
    this.setState({reserves: obj2})
  }

  newGame(){
    if (this.state.player1.name !== '' &&
        this.state.player2.name !== '' &&
        this.state.player1.color !== '' &&
        this.state.player2.color !== ''
      ){
      this.fillTerritories()
      Game.clearBoard()
      this.setState({phase: 'playing', setupError: '', header: 'playing'})
    }
    else{
      this.setState({setupError: 'please enter names and select colors for both players'})
    }
  }

  pickComponent(){
    if (this.state.phase === 'welcome')
      return <Welcome onClick={this.start.bind(this)} ontock={() => this.blow()}/>
    else if (this.state.phase === 'setup'){
      return (<Setup onClick={this.setColor.bind(this)} names={[this.state.player1.name, this.state.player2.name]}
                  onChange={this.setName.bind(this)} error={this.state.setupError}
                  color={[this.state.player1.color, this.state.player2.color]}
                  cancel={this.start.bind(this)} newGame={this.newGame.bind(this)} /> )
    }
    else if (this.state.phase === 'playing'){
      return <Board reserves={this.state.reserves} owners={this.state.owners} />
    }
  }

  renderHeader(){
    if (this.state.phase === 'playing'){
      return (<Header phase={this.state.header} player={this.getPlayer()}
                endTurn={()=>{this.endTurn()}} changePlayer={()=>{this.changePlayer()}}
        />)
    }
    else
      return <Header phase={this.state.header}/>
  }

  setColor(id, color, colorId){
    if (id === 'player1'){
      var player = this.state.player1
      player.color = color
      player.id = colorId
      this.setState({player1: player})
    }
    else if (id === 'player2'){
      player = this.state.player2
      player.color = color
      player.id = colorId
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

  setTerritory(i){
    var owners = this.state.owners
    owners[i] = this.getPlayer().id
    this.setState({owners: owners})
  }

  start(){
    if (this.state.phase === 'welcome')
      this.setState({phase: 'setup'})
    else
      this.setState({phase: 'welcome'})
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.pickComponent()}
        <Footer />
      </div>
    );
  }
}

export default App;
