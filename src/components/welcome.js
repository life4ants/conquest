import React, { Component } from 'react';

class Welcome extends Component {

  render() {
    return (
      <div className="overlay">
        <div className="overlay-box">
          <h1>Welcome to Dominionation!</h1>
          <div className='games-list-box'>
            <div>
              <h4>Saved Games:</h4>
              <ul>
                {this.props.games.map(
                      (game, i) => <li onClick={() => this.props.playGame(i)} key={i}>{game.name}</li>
                      )}
              </ul>
            </div>
            <div id="game-buttons">
              <button className='btn btn-primary' onClick={this.props.newGame}>Start New Game</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;