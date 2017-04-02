import React, { Component } from 'react';
import icon from '../images/march.svg';
import army_A from '../images/Army_A.svg';
import army_P from '../images/Army_P.svg';
import army_C from '../images/Army_C.svg';

class Header extends Component {
  constructor(){
    super()
    this.state = {
      modal: {open: false, allowed: 'no', name: '', title: '', value: 20, id: ''}
    }
  }

  renderButtons(){
    let cancel = this.props.phase === 'playing' ? 'End Turn' : 'Cancel'
    return (
      <div style={{margin: 0}}>
        <button onClick={this.props.endGame} className='btn btn-secondary btn-sm'>End Game</button>
        <button onClick={this.props.cancelTurn} className='btn btn-secondary btn-sm'>{cancel}</button>
      </div>)
  }

  renderIcons(n){
    let obj = []
    for (let i = 0; i<n; i++){
      obj.push(this.renderIcon(i))
    }
    return obj
  }

  renderIcon(i){
    let images = [army_P, army_A, army_C]
    let reserves = this.props.player.reserves[i]
    let disabled = reserves.allowed === 'yes' ? '' : 'disabled'
    let onClick = this.props.phase === 'playing' ? () => this.props.reserves(i) : () => {};
    return (
       <div className='H-icon' key={i}>
        <span className="M-label">{reserves.value}</span>
        <img src={images[i]} alt={reserves.name + " troops"} className={disabled}
             title={"Land troops on the "+reserves.name}     onClick={onClick} />
      </div>)
  }

  showPlayer(){
    return (
        <div className='header-content'>
          {this.renderButtons()}
          {this.renderIcons(3)}
          <div className='H-icon'>
            <span className='M-label'>{this.props.player.marches}</span>
            <img src={icon} alt='number of marches'
                 title={this.props.player.marches +" marches remaining"}
                 onClick={this.props.marchTroops} />
          </div>
          <div className={"player-color"} style={{border: 'solid 5px '+this.props.player.color}}>
            <strong>Player: </strong>{this.props.player.name}
          </div>
          <div><strong>Round: </strong>{this.props.round}</div>
        </div>
      )
  }

  render() {
    let content = this.props.phase === 'setup' ? '' : this.showPlayer();
    return (
      <header>
        {content}
      </header>
    );
  }
}

export default Header;