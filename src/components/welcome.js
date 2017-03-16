import React, { Component } from 'react';

class Welcome extends Component {

  render() {
    return (
      <div className="overlay">
        <div className="overlay-box">
          <h1>Welcome to Dominionation!</h1>
          <button className='btn' onClick={this.props.onClick}>Click here to get started</button>
        </div>
      </div>
    );
  }
}

export default Welcome;