import React, { Component } from 'react';
import MyModal from './myModal';
import icon from '../images/march.svg';
import army_A from '../images/Army_A.svg';
import army_P from '../images/Army_P.svg';
import army_C from '../images/Army_C.svg';

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
          <div>
            <span className="M-label">75</span>
            <img src={army_A} />
          </div>
          <div>
            <span className="M-label">75</span>
            <img src={army_P} />
          </div>
          <div>
            <span className="M-label">75</span>
            <img src={army_C} />
          </div>
          <div>
            <span className='M-label'>5</span>
            <img src={icon} />
          </div>
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