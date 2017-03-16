import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class MyModal extends Component {
  constructor(props){
    super()
    this.state = {
      value: 10,
      error: ''
    }
  }

  onChange(e){
    e.preventDefault()
    const value = e.target.value
    if (value > 0 && value <= this.props.data.max)
      this.setState({value: Number(e.target.value), error: ''})
    else
      if (!this.state.error)
        this.setState({error: 'value must be between 1 and '+this.props.data.max})
  }

  content(){
    if (this.props.data.allowed === 'yes'){
      return (
        <Modal.Body>
          <label>Enter number of troops to land:</label>
          <input type="number" min='1' max={this.props.data.max}
                 value={this.state.value} autoFocus />
          <i>  {this.state.error}</i>
          <p>
            You can only land troops once per ocean per turn. Up to 20 troops may be landed.
          </p>
        </Modal.Body> )
    }
    else {
      let content =
        this.props.data.allowed === 'notThisTurn' ? ' this turn. You can only land troops once per ocean per turn.' : '.';
      return (
        <Modal.Body>
          <p>
            No more troops can be landed from the {this.props.data.name}
            {content}
          </p>
        </Modal.Body>)
    }
  }

  buttons(){
    if (this.props.data.allowed === 'yes'){
      return (
        <Modal.Footer>
          <button className='btn' onClick={() => this.cancel()}>Cancel</button>
          <button className='btn btn-primary' onClick={() => this.submit()}>Ok</button>
        </Modal.Footer> )
    }
    else{
      return (
        <Modal.Footer>
          <button className='btn' onClick={() => this.cancel()}>Ok</button>
        </Modal.Footer> )
    }
  }

  cancel(){
    this.setState({error: ''}) //reset value here if we want (and below)
    this.props.cancel()
  }

  submit(){
    const value = this.state.value
    if (value > 0 && value <= this.props.data.max){
      this.setState({error: ''}) // (right here)
      this.props.submit(value)
    }
    else
      this.setState({value: '', error: 'value must be between 1 and '+this.props.data.max})
  }

  render() {
    if (this.props.open){
      var content = this.content()
      var buttons = this.buttons()
    }
    else {
      content = ''
      buttons = ''
    }

    return (
      <Modal
        show={this.props.open}
        backdrop="static"
        aria-labelledby="ModalHeader"
      >
        <Modal.Header >
          <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
        </Modal.Header>
        {content}
        {buttons}
      </Modal>
    );
  }
}

export default MyModal;



