import React, { Component } from 'react';
import Alert from './alert'

class Welcome extends Component {
  constructor(){
    super()
    this.state = {
      alert: {open: false, content: '', center: false, type: 'alert'}
    }
  }

  closeAlert(){
    this.setState({alert: {open: false, content: '', center: false, type: 'alert', action: ''}})
  }

  openAlert(content, center, type, action){
    this.setState({alert: {open: true, content: content, center: center, type: type, action: action}})
  }

  confirmDeleteGame(id, name){
    this.openAlert('are you sure you want to delete the game "'+name+'"?', true, 'yesno', () => this.deleteGame(id))
  }

  deleteGame(id){
    this.closeAlert()
    this.props.deleteGame(id)
  }

  render() {
    let games = this.props.games !== '' ? this.props.games.map(
              (game, i) => {
                return (
                <li key={i}>
                  <a className="gameName" onClick={() => this.props.playGame(i)}>{game.name}</a>
                  <a className="gameDelete" onClick={() => this.confirmDeleteGame(i, game.name)}>delete</a>
                </li>)
              }) : <i>No saved games yet</i>
    return (
      <div className="overlay">
        <div className="overlay-box">
          <h1>Welcome to Conquest!</h1>
          <h3>How to Play</h3>
          <p>
            Start your turn by clicking on one of the "Land Troops" buttons to land troops on one of the coastal territories. Then you may march some or all of those troops to another territory, thus taking it. Up to 8 such marches may be made in a turn.
          </p>
          <p>
            To attack an opponent's territory, march some of your troops into his territory. Your losses and his losses will be computed at the end of the turn.
          </p>
          <p>
            The game is over when there are no troops left, when one player owns the entire board, or when you get bored and quit. ;) The ending has not been programed yet, because no one has ever finished.
          </p>
          <div className='games-list-box'>
            <div id="game-list">
              <h4>Saved Games:</h4>
              <ul>
                {games}
              </ul>
            </div>
            <div id="game-buttons">
              <button className='btn btn-primary' onClick={this.props.newGame}>Start New Game</button>
            </div>
          </div>
        </div>
        <Alert open={this.state.alert.open}
               content={this.state.alert.content}
               center={this.state.alert.center}
               close={() => this.closeAlert()}
               action={() => this.state.alert.action()}
               type={this.state.alert.type} />
      </div>
    );
  }
}

export default Welcome;