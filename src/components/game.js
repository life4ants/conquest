import React, { Component } from 'react';
import Header from './header'
import Setup from './setup'
import Board from './board'
import Colors from './colors'
import GameData from './gameData'
import Footer from './footer'
import Alert from './alert'
import $ from 'jquery'

var o = {}

class Game extends Component {

  constructor(){
    super();
    this.state = {
      phase: 'playing', //setup **TEST**
      players: [
        {name: 'Andy',
        color: Colors[4],
        id: 4,
        reserves: [
          {name: 'Pacific', value: 50, allowed: 'yes'},
          {name: 'Alantic', value: 50, allowed: 'yes'},
          {name: 'Carribean', value: 50, allowed: 'yes'}],
        marches: 5},
        {name: 'Ben',
        color: Colors[7],
        id: 7,
        reserves: [
          {name: 'Pacific', value: 50, allowed: 'yes'},
          {name: 'Alantic', value: 50, allowed: 'yes'},
          {name: 'Carribean', value: 50, allowed: 'yes'}],
        marches: 5}],
      turnIndex: (Math.random() < .5 ? 0 : 1),
      setupError: '',
      reserves: '',
      owners: '',
      tempTroops: '',
      footer: '',
      popup: {open: false, content: '', center: false, type: 'alert'},
      round: 1,
      selectedTerr: []
    }
  }

  componentDidMount(){
    o.game = this
    this.fillTerritories() //[remove] **TEST**
  }

  addReserves(id){ // id is the territory we are adding to
    let troops = this.state.tempTroops // coast with an id (0-2), and value (num of troops)
    if (GameData.coasts[troops.id].includes(id)){
      let players = this.state.players
      let i = this.state.turnIndex
      let reserves = this.state.reserves
      let owners = this.state.owners
      owners[id] = players[i].id
      if (!reserves[id])
        reserves[id] = troops.value
      else
        reserves[id] = [reserves[id], troops.value]

      players[i].reserves[troops.id].value -= troops.value
      players[i].reserves[troops.id].allowed = players[i].reserves[troops.id].value > 0 ? 'notThisTurn' : 'no';
      this.setState({tempTroops: '', phase: 'playing', footer: '',
                     reserves: reserves, owners: owners, players: players })
    }
    else {
      let content = 'That country is not on the '+ this.currentPlayer().reserves[troops.id].name+" coast!"
      this.showPopup(content, true, 'alert')
    }
  }

  cancelReserves(){
    this.setState({tempTroops: '', phase: 'playing', footer: ''})
  }

  clicker(i){
    if (this.state.phase === 'reserves')
      this.addReserves(i)
    else if (this.state.phase === 'march1'){
      this.select(i)

    }
  }
  select(country) {
   var id = ".territory"+country;
   if (country === 87 || country === 88)
     $(id).css("stroke-width", "3");
   else
     $(id).css("stroke-width", "30");
  }

  deselect(country) {
   var id = ".territory"+country;
   $(id).css("stroke-width", "0");
  }

  closePopup(){
    this.setState({popup: {open: false, content: '', center: false, type: 'alert', action: ''}})
  }

  showPopup(content, center, type, action){
    this.setState({popup: {open: true, content: content, center: center, type: type, action: action}})
  }

  currentPlayer(){
    return this.state.players[this.state.turnIndex]
  }

  confirmEndTurn(){
    this.showPopup('Are you sure you want to end your turn?', false, 'yesno', () => this.endTurn())
  }

  endTurn(){
    this.closePopup()
    let index = this.state.turnIndex
    let players = this.state.players
    players.forEach((player) =>{
      for(let j=0; j<3; j++){
        player.reserves[j].allowed = player.reserves[j].value > 0 ? 'yes' : 'no'
      }
    });
    this.setState({players: players})
    index === 0 ? this.setState({turnIndex: 1}) : this.setState({turnIndex: 0});
  }

  confirmEndGame(){
    this.showPopup('Are you sure you want to end the game?', false, 'yesno', () => this.endGame())
  }

  endGame(){
    this.props.cancel()
  }

  fillTerritories(){
    let obj1 = Array(91)
    let obj2 = Array(91)
    for (let i=1; i<91; i++){
      if (GameData.coasts[0].includes(i))
        obj2[i] = 10
      else if (GameData.coasts[1].includes(i))
        obj2[i] = 11
      else if (GameData.coasts[2].includes(i))
        obj2[i] = 12
    }
    this.setState({reserves: obj1, owners: obj2})
  }

  initializeTerritories(){
    var player1 = Math.floor(Math.random() * 45) + 1;
    var player2 = Math.floor(Math.random() * 45) + 46;
    var obj = Array(91);
    obj[player1] = this.state.players[0].id
    obj[player2] = this.state.player[1].id
    this.setState({owners: obj})
    var obj2 = Array(91)
    obj2[player1] = [10,5]
    obj2[player2] = [8, 3]
    this.setState({reserves: obj2})
  }

  landReserves (id, value){
    let coast = this.currentPlayer().reserves[id]
    this.setState({tempTroops: {value: value, id: id}, phase: 'reserves', footer: ['reserves', coast.name]})
  }

  marchTroops(){
    if (this.currentPlayer().marches > 0){
      this.setState({phase: 'march1', footer: ['march1']})
    }
    else
      this.showPopup("You have no marches remaining. End your turn or land reserves.", false, 'alert')
  }

  newGame(){
    if (this.state.players[0].name !== '' &&
        this.state.players[1].name !== '' &&
        this.state.players[0].color !== '' &&
        this.state.players[1].color !== ''
      ){
      this.fillTerritories()
      GameData.clearBoard()
      this.setState({phase: 'playing', setupError: '', header: 'playing'})
    }
    else{
      this.setState({setupError: 'please enter names and select colors for both players'})
    }
  }

  pickComponent(){
    if (this.state.phase === 'setup'){
      return (<Setup onClick={this.setColor.bind(this)} names={[this.state.players[0].name, this.state.players[1].name]}
                  onChange={this.setName.bind(this)} error={this.state.setupError}
                  color={[this.state.players[0].color, this.state.players[1].color]}
                  cancel={this.props.cancel} newGame={this.newGame.bind(this)} /> )
    }
    else {
      return <Board reserves={this.state.reserves} owners={this.state.owners} />
    }
  }

  renderHeader(){
    if (this.state.phase === 'setup')
      return <Header phase={this.state.phase}/>
    else if (this.state.phase === 'playing') {
      return (<Header phase={this.state.phase} player={this.currentPlayer()}
                cancelTurn={() => this.confirmEndTurn()} endGame={() => this.confirmEndGame()}
                landReserves={(action, value) => this.landReserves(action, value)}
                marchTroops={() => this.marchTroops()}
        />)
    }
    else if (this.state.phase === 'reserves') {
      return (<Header phase={this.state.phase} player={this.currentPlayer()}
                cancelTurn={() => this.cancelReserves()} endGame={() => this.confirmEndGame()}
                landReserves={() => {}}
                marchTroops={() => {}}
        />)
    }
    else if (['march1', 'march2'].includes(this.state.phase)) { //working on this **WIP**
      return (<Header phase={this.state.phase} player={this.currentPlayer()}
                cancelTurn={() => this.cancelReserves()} endGame={() => this.confirmEndGame()}
                landReserves={() => {}}
                marchTroops={() => {}}
        />)
    }
  }

  setColor(id, color, colorId){
      var players = this.state.players
      players[id].color = color
      players[id].id = colorId
      this.setState({players: players})
  }

  setName(e){
    e.preventDefault()
    let id = e.target.id
    let players = this.state.players
    players[id].name = e.target.value
    this.setState({players: players})
  }

  setTerritory(i){
    var owners = this.state.owners
    owners[i] = this.state.player[this.state.turnIndex].id
    this.setState({owners: owners})
  }

  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.pickComponent()}
        <Alert open={this.state.popup.open}
               content={this.state.popup.content}
               center={this.state.popup.center}
               close={() => this.closePopup()}
               action={() => this.state.popup.action()}
               type={this.state.popup.type} />
        <Footer value={this.state.footer} />
      </div>
    );
  }
}

export default Game;


window.clicker = function(i){
  o.game.clicker(i)
}


window.getter = function(){
  return o.game.state.selectedTerr
}
