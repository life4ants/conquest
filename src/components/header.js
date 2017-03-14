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
      modal: {open: false, allowed: 'no', name: '', title: '', value: 20, id: ''}
    }
  }

  closeModal(){
    let o = this.state.modal
    o.open = false
    this.setState({ modal: o })
  }

  openModal(id){
    let obj = {}
    let name = this.props.player.reserves[id].name
    obj.title = "Land troops from the "+ name
    obj.open = true
    obj.name = name
    obj.id = id
    obj.allowed = this.props.player.reserves[id].allowed
    obj.value = this.props.player.reserves[id].value

    this.setState({ modal: obj})
  }

  modalAction(value){
    let id = this.state.modal.id;
    let o = this.state.modal
    o.open = false
    this.setState({ modal: o })
    this.props.landReserves(id, value)
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
    let onClick = this.props.phase === 'playing' ? () => this.openModal(i) : () => {};
    return (
       <div className='H-icon' key={i}>
        <span className="M-label">{reserves.value}</span>
        <img src={images[i]} alt={reserves.name + " troops"}
             title={reserves.value+ " reserves available on the "+reserves.name}
             onClick={onClick}/>
      </div>)
  }

  showPlayer(){
    return (
        <div className='header-content'>
          <MyModal open={this.state.modal.open}
                   allowed={this.state.modal.allowed}
                   submit={this.modalAction.bind(this)}
                   cancel={this.closeModal.bind(this)}
                   name={this.state.modal.name}
                   title={this.state.modal.title}
                   value={this.state.modal.value} />

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
        </div>
      )
  }

  render() {
    let content = this.props.phase === 'setup' ? 'Welcome to the Domionionation Game' : this.showPlayer();
    return (
      <header>
        {content}
      </header>
    );
  }
}

export default Header;