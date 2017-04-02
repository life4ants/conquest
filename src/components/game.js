import React, { Component } from 'react';
import Header from './header'
import Setup from './setup'
import Board from './board'
import GameData from './gameData'
import GameMap from './game_map'
import Footer from './footer'
import Alert from './alert'
import Popup from './popup'
import $ from 'jquery'

class Game extends Component {

  constructor(props){
    super(props);
    let state = props.gameId !== 'none' ? JSON.parse(localStorage.conquestGames)[props.gameId]
      : {
        name: '',
        id: 'none',
        phase: 'setup',
        players: [
          {name: '',
          color: '',
          id: '',
          terrCount: 0,
          reserves: [
            {name: 'Pacific', value: 100, allowed: 'yes'},
            {name: 'Alantic', value: 100, allowed: 'yes'},
            {name: 'Carribean', value: 100, allowed: 'yes'}],
          marches: 8},
          {name: '',
          color: '',
          id: '',
          terrCount: 0,
          reserves: [
            {name: 'Pacific', value: 100, allowed: 'yes'},
            {name: 'Alantic', value: 100, allowed: 'yes'},
            {name: 'Carribean', value: 100, allowed: 'yes'}],
          marches: 8}],
        turnIndex: (Math.random() < .5 ? 0 : 1),
        setupError: '',
        reserves: this.initializeReserves(),
        owners: Array(91).fill(2),
        tempTroops: [],
        footer: '',
        alert: {open: false, content: '', center: false, type: 'alert'},
        round: 1,
        selectedTerr: '',
        popup: {open: false, type: 'none'}
      };
      this.state = state
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

          // -----Endturn & EndGame:----
  confirmEndTurn(){
    let name = this.currentPlayer().name
    this.openAlert(name +', are you sure you want to end your turn?', false, 'yesno', () => this.endTurn())
  }

  endTurn(){
    this.closeAlert()
    let index = this.state.turnIndex
    let players = this.state.players
    for(let j=0; j<3; j++){
      players[index].reserves[j].allowed = players[index].reserves[j].value > 0 ? 'yes' : 'no'
    }
    players[index].marches = 8
    let reserves = this.state.reserves
    for (let i=1; i<reserves.length; i++){
      if (reserves[i][0] !== 0 && reserves[i][1] !== 0){
        this.runAttack(i)
      }
    }
    let turnIndex = index === 0 ? 1 : 0
    let round = turnIndex === 0 ? this.state.round + 1 : this.state.round
    this.setState({players: players, turnIndex: turnIndex, round: round})
  }

  confirmEndGame(){ //content, title, type, action, label, max, id
    this.openPopup('Do you want to save your game before closing?', 'End Game', 'confirm', (i) => this.endGame(i))
  }

  endGame(id){
    if (id === 'no')
      this.props.cancel()
    else if (id === 'yes'){
      if (this.state.id === 'none')
        this.openPopup('','Save Game', 'text-input', (i) => this.saveGame(i), 'Please name your game:')
      else
        this.saveGame([true, 'existing'])
    }
}

  saveGame(data){
    if (data[0]) {
      let games = JSON.parse(localStorage.conquestGames)
      if (data[1] === 'new') {
        let game = this.state
        game.name = data[2]
        game.popup = {open: false, type: 'none'}
        game.phase = 'playing'
        game.selectedTerr = ''
        game.id = (games[games.length-1] + 1) || 0
        games.push(game)
      }
      else if (data[1] === 'existing'){
        let game = this.state
        game.popup = {open: false, type: 'none'}
        game.phase = 'playing'
        game.selectedTerr = ''
        games[this.props.gameId] = game
      }
      localStorage.setItem('conquestGames', JSON.stringify(games))
      this.props.cancel()
    }
    else
      this.confirmEndGame()
  }

  runAttack(terr){
    let reserves = this.state.reserves
    let dID = this.state.owners[terr]
    let aID = dID === 1 ? 0 : 1
    // decide who's bigger
    if (reserves[terr][dID] < reserves[terr][aID]){
      var bg = reserves[terr][aID]
      var owner = 'sm'
      var sm = reserves[terr][dID]
    }
    else {
      bg = reserves[terr][dID]
      sm = reserves[terr][aID]
      owner = 'bg'
    }
    // kill them off
    if (sm < 4){
      bg -= sm
      sm = 0
    }
    else if (sm < 9){
      bg -= Math.floor(Math.random() * 3 + (sm-1))
      sm = 0
      if (bg < 0){
          bg++
          sm++
        }
    }
    else if (sm < 12){
      bg -= Math.floor(Math.random() * 4 + (sm-1))
      sm = 0

    }
    else {
      bg -= Math.floor(Math.random() * 5 + 10)
      sm -= 12
    }
    // adjust:
    if (bg < 0){
      let aj = -bg
      bg += aj
      sm += aj
    }

    reserves[terr][dID] = owner === 'bg' ? bg : sm // the owner/defender
    reserves[terr][aID] = owner === 'bg' ? sm : bg // the attacker
    let owners = this.state.owners

    if (reserves[terr][dID] === 0){ // defender reserves
      if (reserves[terr][aID] === 0){ // attacker reserves
        owners[terr] = 2
      }
      else {
        owners[terr] = aID
      }
    }
    this.setState({reserves: reserves, owners: owners})
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
        this.marchTo(this.state.selectedTerr, i)
        break
      default:
    }
  }

  select(country) {
   var id = ".territory"+country;
     $(id).css("stroke-width", "4");
  }

  deselect(terr) {
    let id = ".territory"+terr;
    $(id).css("stroke-width", "0");
  }

  changeColor(id, color){ // Uneeded **
    var classNames = $(".territory"+id)[0].className.baseVal.split(/\s+/);
    if (color){
      let newClass = classNames[0] + ' color'+color;
      $('.territory'+id).removeClass().addClass(newClass);
    }
    else
      $('.territory'+id).removeClass().addClass(classNames[0]);
  }

            // -----Marching Troops:-------
  addTroopsTo(terr, troops){
    let pID = this.state.turnIndex
    let aID = pID === 1 ? 0 : 1
    let reserves = this.state.reserves
    let owners = this.state.owners
    if (owners[terr] === 2){
      reserves[terr][pID] += (troops + reserves[terr][2])
      reserves[terr][2] = 0
      owners[terr] = pID
    }
    else if (reserves[terr][aID] === 0){
      reserves[terr][pID] += troops
      owners[terr] = pID
    }
    else
      reserves[terr][pID] += troops

    this.setState({reserves: reserves, owners: owners })
  }

  cancelMarch(){
    this.deselect(this.state.selectedTerr)
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
      this.select(terr2)
      this.marchingModal(terr1, terr2)
    }
    else
      this.openAlert("Troops can only march to a bordering Territory!", true, 'alert')
  }

  marchingModal(terr1, terr2){
    let title = "Marching Troops"
    let label = "Enter number of Troops to move:"
    let max = this.state.reserves[terr1][this.state.turnIndex]
    this.openPopup('', title, 'double-spinbox', (i) => this.moveTroops(i), label, max, [terr1, terr2])
  }

  moveTroops(value){
    let terrs = this.state.popup.id
    this.closePopup()
    this.addTroopsTo(terrs[1], value)
    let reserves = this.state.reserves
    let players = this.state.players
    let i = this.state.turnIndex
    reserves[terrs[0]][i] -= value
    players[i].marches -= 1
    if (players[i].marches <= 0){
      var footer = ''
      var phase = 'playing'
    }
    else {
      footer = ['march1']
      phase = 'march1'
    }
    this.deselect(terrs[1])
    this.deselect(terrs[0])
    this.setState({selectedTerr: '', reserves: reserves, phase: phase, footer: footer, players: players})
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
    if (typeof this.state.popup.id === 'object'){
      this.deselect(this.state.popup.id[1])
      var footer = ['march2']
    }
    else footer = [this.state.phase]
    this.setState({footer: footer, popup: {open: false, type: 'none'}})
  }

  openPopup(content, title, type, action, label, max, id){
    this.setState({footer: '', popup: {open: true, content: content, title: title, type: type,
                                      label: label, max: max, action: action, id: id}})
  }

            // -----Reserves:-----
  addReserves(terr){ // id is the territory we are adding to
    let troops = this.state.tempTroops // coast with an id (0-2), and value (num of troops)
    let players = this.state.players
    let i = this.state.turnIndex
    if (GameData.coasts[troops.id].includes(terr)){
      this.addTroopsTo(terr, troops.value)
      players[i].reserves[troops.id].value -= troops.value
      players[i].reserves[troops.id].allowed = players[i].reserves[troops.id].value > 0 ? 'notThisTurn' : 'no';
      this.setState({tempTroops: [], phase: 'playing', footer: '', players: players })
    }
    else {
      let content = 'That country is not on the '+ players[i].reserves[troops.id].name+" coast!"
      this.openAlert(content, true, 'alert')
    }
  }

  cancelReserves(){
    this.setState({tempTroops: [], phase: 'playing', footer: ''})
  }

  landReserves (value){
    let id = this.state.popup.id;
    this.closePopup()
    let coast = this.currentPlayer().reserves[id]
    this.setState({tempTroops: {value: value, id: id}, phase: 'reserves', footer: ['reserves', coast.name]})
  }

  reservesModal(id){
    let player = this.currentPlayer()
    let name = player.reserves[id].name
    let title = "Land troops from the "+ name
    let allowed = player.reserves[id].allowed
    let value = player.reserves[id].value
    let max = value < 20 ? value : 20
    if (allowed === 'yes'){
      let content = "You can only land troops once per ocean per turn. Up to 20 troops may be landed."
      let label = "Enter number of troops to land:"
      this.openPopup(content, title, 'spinbox', (i) => this.landReserves(i), label, max, id)
    }
    else {
      let content = "No more troops can be landed from the " +name
      content += allowed === 'notThisTurn' ? ' this turn. You can only land troops once per ocean per turn.' : '.';
      this.openPopup(content, title, 'info')
    }
  }

          // -------Setup Form:-------
  setColor(id, color, colorId){
    let players = this.state.players
    let otherId = id === 1 ? 0 : 1
    if (players[otherId].id === colorId)
      this.setState({setupError: 'both players cannot have the same color'})
    else {
      players[id].color = color
      players[id].id = colorId
      this.setState({players: players, setupError: ''})
    }
  }

  setName(e){
    e.preventDefault()
    let id = e.target.id
    let players = this.state.players
    players[id].name = e.target.value
    this.setState({players: players, setupError: ''})
  }

  newGame(){
    if (this.state.players[0].name !== '' &&
        this.state.players[1].name !== '' &&
        this.state.players[0].color !== '' &&
        this.state.players[1].color !== ''
      ){
      GameData.clearBoard()
      GameData.colorBoard()
      this.setState({phase: 'playing', setupError: '', header: 'playing'})
    }
    else{
      this.setState({setupError: 'please enter names and select colors for both players'})
    }
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
    let cancelTurn = ''
    let marchTroops = ''
    let reserves = ''

    if (this.state.phase === 'playing') {
      cancelTurn = () => this.confirmEndTurn()
      marchTroops = () => this.validateMarch()
      reserves = (i) => this.reservesModal(i)
    }
    else if (this.state.phase === 'reserves') {
      cancelTurn = () => this.cancelReserves()
      marchTroops = () => {}
    }
    else if (['march1', 'march2'].includes(this.state.phase)) {
      cancelTurn = () => this.cancelMarch()
      marchTroops = () => {}
    }

    if (this.state.phase === 'setup')
      return <Header phase={this.state.phase}/>
    else {
      return (<Header phase={this.state.phase} player={this.currentPlayer()}
                cancelTurn={cancelTurn} endGame={() => this.confirmEndGame()}
                round={this.state.round} marchTroops={marchTroops} reserves={reserves} />)
    }
  }

  render() {
    return (
      <div className="game">
        {this.renderHeader()}
        <div id="wrapper">
          <GameMap clicker={(i) => this.clicker(i)} owners={this.state.owners}
                   colors={[this.state.players[0].id, this.state.players[1].id]} />
        </div>
        {this.pickComponent()}
        <Alert open={this.state.alert.open}
               content={this.state.alert.content}
               center={this.state.alert.center}
               close={() => this.closeAlert()}
               action={() => this.state.alert.action()}
               type={this.state.alert.type} />
        <Popup open={this.state.popup.open}
               cancel={() => this.closePopup()}
               content={this.state.popup.content}
               title={this.state.popup.title}
               type={this.state.popup.type}
               max={this.state.popup.max}
               label={this.state.popup.label}
               action={(i) => this.state.popup.action(i)} />
        <Footer value={this.state.footer} />
      </div>
    );
  }
}

export default Game;

window.getter = (i) => {
  return $('.color'+i)
}
