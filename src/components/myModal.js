import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class MyModal extends Component {
  render() {

    return (
      <Modal
        show={this.props.open}
        backdrop="static"
        aria-labelledby="ModalHeader"
      >
        <Modal.Header >
          <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Some Content here</p>
          <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' onClick={this.props.saveAndClose}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MyModal;



