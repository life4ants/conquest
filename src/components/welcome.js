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
    let games = this.props.games != '' ? this.props.games.map(
              (game, i) => {
                return (
                <li key={i}>
                  <a onClick={() => this.props.playGame(i)}>{game.name}</a>
                  <button className='btn btn-danger btn-sm' onClick={() => this.confirmDeleteGame(i, game.name)}>delete</button>
                </li>)
              }) : <i>No saved games yet</i>
    return (
      <div className="overlay">
        <div className="overlay-box">
          <h1>Welcome to Conquest!</h1>
          <p>
            Rules? How to play? Sorry, you're on your own. Figure it out.
          </p>
          <div className='games-list-box'>
            <div>
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