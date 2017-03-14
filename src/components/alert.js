import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Alert extends Component {
  buttons(){
    if (this.props.type === 'alert') {
      return (
        <Modal.Footer>
          <button className='btn' onClick={this.props.close}>Ok</button>
        </Modal.Footer>)
    }
    else if (this.props.type === 'yesno'){
      return (
        <Modal.Footer>
          <button className='btn' onClick={this.props.action}>Yes</button>
          <button className='btn' onClick={this.props.close}>No</button>
        </Modal.Footer> )
    }
  }

  render() {
    let center = this.props.center ? "-center" : ''
    return (
      <Modal
        show={this.props.open}
        backdrop="static"
        aria-labelledby="ModalHeader"
        id={'popup'+center}
      >
        <Modal.Body>
          <Modal.Title id='ModalHeader'>{this.props.content}</Modal.Title>
        </Modal.Body>
          {this.buttons()}
      </Modal>
    );
  }
}

export default Alert;