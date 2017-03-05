import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'

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

    let saveAndClose = () => {
      this.setState({ modalOpen: false })
    }
    return (
        <div className='header-content'>
                <div>
          <button type='button' onClick={openModal} >Launch modal</button>

          <Modal
            show={this.state.modalOpen}
            backdrop="static"
            onHide={closeModal}
            aria-labelledby="ModalHeader"
          >
            <Modal.Header closeButton>
              <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Some Content here</p>
            </Modal.Body>
            <Modal.Footer>
              // If you don't have anything fancy to do you can use
              // the convenient `Dismiss` component, it will
              // trigger `onHide` when clicked


              // Or you can create your own dismiss buttons
              <button className='btn btn-primary' onClick={saveAndClose}>
                Save
              </button>
            </Modal.Footer>
          </Modal>
        </div>
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
    let content = this.props.phase === 'welcome' ? 'Welcome to the Domionionation Game' : this.showPlayer();
    return (
      <div className="header">
        {content}
      </div>
    );
  }
}

export default Header;