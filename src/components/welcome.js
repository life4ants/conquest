import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return (
      <div className="overlay">
        <h1>Welcome to Dominionation!</h1>
        <button className='btn' onClick={this.props.onClick}>Click here to get started</button>
        <button className='btn' onClick={this.props.ontock}>Click here to blow it all away!</button>
      </div>
    );
  }
}

export default Welcome;