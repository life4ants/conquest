import React, { Component } from 'react';
import Header from './header'
import Setup from './setup'
import Board from './board'
import Colors from './colors'
import GameData from './gameData'
import Footer from './footer'
import Alert from './alert'
import MyModal from './myModal'
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
        terrCount: 0,
        reserves: [
          {name: 'Pacific', value: 50, allowed: 'yes'},
          {name: 'Alantic', value: 50, allowed: 'yes'},
          {name: 'Carribean', value: 50, allowed: 'yes'}],
        marches: 5},
        {name: 'Ben',
        color: Colors[7],
        id: 7,
        terrCount: 0,
        reserves: [
          {name: 'Pacific', value: 50, allowed: 'yes'},
          {name: 'Alantic', value: 50, allowed: 'yes'},
          {name: 'Carribean', value: 50, allowed: 'yes'}],
        marches: 5}],
      turnIndex: (Math.random() < .5 ? 0 : 1),
      setupError: '',
      reserves: this.initializeReserves(),
      owners: Array(91).fill(2),
      tempTroops: [],
      footer: '',
      alert: {open: false, content: '', center: false, type: 'alert'},
      round: 1,
      selectedTerr: '',
      modal: {open: false, title: '', data: {} }
    }
  }

  componentDidMount(){
    o.game = this
    GameData.colorBoard() //[remove] **TEST**
  }

  initializeReserves(){
    let obj = []
    for (let i=1; i<91; i++){
      obj[i] = [0, 0, Math.floor(Math.random() * 4)]
    }
    return obj
  }

  currentPlayer(){
    return this.state.players[this.state.turnIndex]
  }

  countTerritories(owners){
    //owners.forEach()
  }

          // -----Endturn & EndGame:----
  confirmEndTurn(){
    this.openAlert('Are you sure you want to end your turn?', false, 'yesno', () => this.endTurn())
  }

  endTurn(){
    this.closeAlert()
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
    this.openAlert('Are you sure you want to end the game?', false, 'yesno', () => this.endGame())
  }

  endGame(){
    this.props.cancel()
  }

            // -----Map interaction:-----
  clicker(i){
    switch(this.state.phase){
      case 'reserves':
        this.addReserves(i)
        break
      case 'march1':
        this.marchFrom(i)
        break
      case 'march2':
        this.marchTo(i, this.state.selectedTerr)
        break
      default:
    }
  }

  select(country) {
   var id = ".territory"+country;
     $(id).css("stroke-width", "4");
  }

  deselect() {
    let terr = this.state.selectedTerr
    this.setState({selectedTerr: ''})
    let id = ".territory"+terr;
    $(id).css("stroke-width", "0");
  }

  changeColor(id, color){
    var classNames = $(".territory"+id)[0].className.baseVal.split(/\s+/);
    var newClass = classNames[0] + ' color'+color;
    $('.territory'+id).removeClass().addClass(newClass);
  }

            // -----Marching Troops:-------
  cancelMarch(){
    this.deselect()
    this.setState({phase: 'playing', footer: ''})
  }

  marchFrom(id){
    if (this.state.reserves[id][this.state.turnIndex] > 0){
      this.select(id)
      this.setState({selectedTerr: id, phase: 'march2', footer: ['march2']})
    }
    else
      this.openAlert('You do not have any troops on that Territory to march!', true, 'alert')
  }

  marchTo(terr1, terr2){
    if (GameData.canFight(terr1, terr2)){

    }
    else
      this.openAlert("Troops can only march to a bordering Territory!", true, 'alert')
  }

  validateMarch(){
    if (this.currentPlayer().marches > 0){
      this.setState({phase: 'march1', footer: ['march1']})
    }
    else
      this.openAlert("You have no marches remaining. End your turn or land reserves.", false, 'alert')
  }

            // ----Alert:----
  closeAlert(){
    this.setState({alert: {open: false, content: '', center: false, type: 'alert', action: ''}})
  }

  openAlert(content, center, type, action){
    this.setState({alert: {open: true, content: content, center: center, type: type, action: action}})
  }

            // ------Popup:------
  closePopup(){

  }

  openPopup(){

  }

  closeModal(){
    this.setState({ modal: {open: false, title: '', data: {} }})
  }

  openModal(id){
    let player = this.currentPlayer()
    let name = player.reserves[id].name
    let title = "Land troops from the "+ name
    let allowed = player.reserves[id].allowed
    let value = player.reserves[id].value
    let max = value < 20 ? value : 20
    this.setState({ modal:
                      {open: true,
                      title: title,
                      data: {name: name, id: id, max: max, allowed: allowed, value: value} }
                    })
  }

  modalAction(value){
    let id = this.state.modal.data.id;
    this.closeModal()
    this.landReserves(id, value)
  }

            // -------Render Helpers:-------
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
                marchTroops={() => this.validateMarch()} openModal={(i) => this.openModal(i)}
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
                cancelTurn={() => this.cancelMarch()} endGame={() => this.confirmEndGame()}
                landReserves={() => {}}
                marchTroops={() => {}}
        />)
    }
  }

            // -----Reserves:-----
  addReserves(id){ // id is the territory we are adding to
    let troops = this.state.tempTroops // coast with an id (0-2), and value (num of troops)
    if (GameData.coasts[troops.id].includes(id)){
      let players = this.state.players
      let i = this.state.turnIndex
      let reserves = this.state.reserves
      let owners = this.state.owners
      if (owners[id] === 2){
        reserves[id][i] += (troops.value + reserves[id][2])
        reserves[id][2] = 0
        owners[id] = i
        this.changeColor(id, players[i].id)
      }
      else
        reserves[id][i] += troops.value

      players[i].reserves[troops.id].value -= troops.value
      players[i].reserves[troops.id].allowed = players[i].reserves[troops.id].value > 0 ? 'notThisTurn' : 'no';
      this.setState({tempTroops: [], phase: 'playing', footer: '',
                     reserves: reserves, owners: owners, players: players })
    }
    else {
      let content = 'That country is not on the '+ this.currentPlayer().reserves[troops.id].name+" coast!"
      this.openAlert(content, true, 'alert')
    }
  }

  cancelReserves(){
    this.setState({tempTroops: [], phase: 'playing', footer: ''})
  }

  landReserves (id, value){
    let coast = this.currentPlayer().reserves[id]
    this.setState({tempTroops: {value: value, id: id}, phase: 'reserves', footer: ['reserves', coast.name]})
  }

          // -------Setup Form:-------
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

  newGame(){
    if (this.state.players[0].name !== '' &&
        this.state.players[1].name !== '' &&
        this.state.players[0].color !== '' &&
        this.state.players[1].color !== ''
      ){
      GameData.colorBoard()
      this.setState({phase: 'playing', setupError: '', header: 'playing'})
    }
    else{
      this.setState({setupError: 'please enter names and select colors for both players'})
    }
  }
  /*
  setTerritory(i){
    var owners = this.state.owners
    owners[i] = this.state.player[this.state.turnIndex].id
    this.setState({owners: owners})
  }

  fillTerritories(){
    let obj1 = Array(91)
    let obj2 = Array(91)
    for (let i=1; i<91; i++){
      obj1[i] = 10
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
  */
  render() {
    return (
      <div className="App">
        {this.renderHeader()}
        {this.pickComponent()}
        <Alert open={this.state.alert.open}
               content={this.state.alert.content}
               center={this.state.alert.center}
               close={() => this.closeAlert()}
               action={() => this.state.alert.action()}
               type={this.state.alert.type} />
        <MyModal open={this.state.modal.open}
                 title={this.state.modal.title}
                 submit={this.modalAction.bind(this)}
                 cancel={this.closeModal.bind(this)}
                 data={this.state.modal.data} />
        <Footer value={this.state.footer} />
      </div>
    );
  }
}

export default Game;


window.clicker = function(i){
  o.game.clicker(i)
}


window.getter = function(id){
  switch(id){
    case 'selected':
      return o.game.state.selectedTerr
    case 'reserves':
      return o.game.state.reserves
    case 'add':
      o.game.add()
      break
    default:
      return o.game.state
  }
}
