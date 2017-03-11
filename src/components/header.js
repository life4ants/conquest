import React, { Component } from 'react';
import MyModal from './myModal';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      modalOpen: false
    }
  }

  showPlayer(){

    let closeModal = () => {this.setState({ modalOpen: false })}
    let openModal = () => {this.setState({ modalOpen: true })}

    return (
        <div className='header-content'>
          <div>
            {/*<button type='button' onClick={openModal} >Launch modal</button>*/}
            <MyModal open={this.state.modalOpen} saveAndClose={closeModal} />
          </div>
          {/*<button onClick={this.props.changePlayer} className='btn btn-secondary btn-sm'>Change Players Info</button>*/}
          <button onClick={this.props.endTurn} className='btn btn-secondary btn-sm'>End Turn</button>
          <div><strong>Reserves Remaining: </strong>75 75 75</div>
          <div><strong>Marches Remaining: </strong>5</div>
          <div className={"player-color"} style={{border: 'solid 5px '+this.props.player.color}}>
            <strong>Player: </strong>{this.props.player.name}
          </div>
        </div>
      )
  }

  render() {
    let content = this.props.phase === 'welcome' ? 'Welcome to the Domionionation Game' : this.showPlayer();
    return (
      <header>
        {content}
      </header>
    );
  }
}

export default Header;