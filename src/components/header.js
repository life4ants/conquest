import React, { Component } from 'react';

class Header extends Component {
  showPlayer(){
    return (
        <div className='header-content'>
          <button onClick={this.props.changePlayer} className='btn btn-secondary btn-sm'>Change Players Info</button>
          <button onClick={this.props.endTurn} className='btn btn-secondary btn-sm'>End Turn</button>
          <div>Player:</div>
          <div className={"player-color"} style={{border: 'solid 5px '+this.props.player.color}}>
            {this.props.player.name}
          </div>
        </div>
      )
  }

  render() {
    var content = this.props.phase === 'welcome' ? 'Welcome to the Domionionation Game' : this.showPlayer();
    return (
      <div className="header">
        {content}
      </div>
    );
  }
}

export default Header;