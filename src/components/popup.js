import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Popup extends Component {
  constructor(props){
    super()
    this.state = {
      value: props.value,
      error: ''
    }
  }

  onChange(e){
    e.preventDefault()
    const value = e.target.value
    const max = this.props.value < 20 ? this.props.value : 20
    if (value > 0 && value <= max)
      this.setState({value: Number(e.target.value), error: ''})
    else
      this.setState({value: '', error: 'value must be between 1 and '+max})
  }

  content(){
    if (this.props.allowed === 'yes'){
      return (
        <Modal.Body>
          <label>Enter number of troops to land: </label>
          <input type="number" min='1' max={this.props.max} value={this.state.value} onChange={this.onChange.bind(this)} autoFocus />
          <i>  {this.state.error}</i>
          <p>
            You can only land troops once per ocean per turn. Up to 20 troops may be landed.
          </p>
        </Modal.Body> )
    }
    else {
      let content =
        this.props.allowed === 'notThisTurn' ? ' this turn. You can only land troops once per ocean per turn.' : '.';
      return (
        <Modal.Body>
          <p>
            No more troops can be landed from the {this.props.name}
            {content}
          </p>
        </Modal.Body>)
    }
  }

  buttons(){
    if (this.props.type === 'confirm'){
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
    const max = this.props.max
    if (value > 0 && value <= max){
      this.setState({error: ''}) // (right here)
      this.props.submit(this.state.value)
    }
    else
      this.setState({value: max, error: 'value must be between 1 and '+max})
  }

  render() {

    return (
      <Modal
        show={this.props.open}
        backdrop="static"
        aria-labelledby="ModalHeader"
      >
        <Modal.Header >
          <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
        </Modal.Header>
        {this.props.content}
        {this.buttons()}
      </Modal>
    );
  }
}

export default Popup;



