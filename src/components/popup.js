import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

class Popup extends Component {
  constructor(props){
    super()
    this.state = {
      value: '',
      numLeft: 0,
      error: ''
    }
  }
  // Expected Props:
  // for all: cancel
// for info: content, title, type
// for spinbox: content, title, type, label, max, action
  componentWillReceiveProps(nextProps){
    if (nextProps.type === 'double-spinbox'){
      var value = Math.round(nextProps.max / 2)
    }
    else
      value = nextProps.max
    const numLeft = nextProps.max - value
    this.setState({value: value, numLeft: numLeft})
  }

  onChange(e){
    e.preventDefault()
    const value = Number(e.target.value)
    const max = this.props.max
    if (value > 0 && value <= max)
      this.setState({value: value, numLeft: max-value, error: ''})
    else
      this.setState({value: value, error: 'value must be between 1 and '+this.props.max})
  }

  content(){
    if (this.props.type === 'spinbox'){
      return (
        <Modal.Body>
          <label>{this.props.label}</label>
          <input type="number" min='1' max={this.props.max} value={this.state.value} onChange={(e) => this.onChange(e)} autoFocus />
          <i>  {this.state.error}</i>
          <p>
            {this.props.content}
          </p>
        </Modal.Body> )
    }
    else if (this.props.type === 'double-spinbox'){
      return (
        <Modal.Body>
          <label>{this.props.label}</label>
          <input type="number" min='1' max={this.props.max} value={this.state.value} onChange={(e) => this.onChange(e)} autoFocus />
          <i>  {this.state.error}</i><br />
          <label>This will leave behind:</label>
          <input value={this.state.numLeft} type='number' readOnly/>
          <p>
            {this.props.content}
          </p>
        </Modal.Body> )
    }
    else if (this.props.type === 'info') {
      return (
        <Modal.Body>
          <p>
            {this.props.content}
          </p>
        </Modal.Body>)
    }
  }

  buttons(){
    if (['spinbox', 'double-spinbox'].includes(this.props.type)){
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
    this.setState({error: ''})
    this.props.cancel()
  }

  submit(){
    const value = this.state.value
    if (value > 0 && value <= this.props.max){
      this.setState({error: ''})
      this.props.action(value)
    }
    else
      this.setState({value: '', error: 'value must be between 1 and '+this.props.max})
  }

  render() {

    return (
      <Modal
        show={this.props.open}
        keyboard={true}
        backdrop="static"
        aria-labelledby="ModalHeader"
      >
        <Modal.Header >
          <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
        </Modal.Header>
        {this.content()}
        {this.buttons()}
      </Modal>
    );
  }
}

export default Popup;



