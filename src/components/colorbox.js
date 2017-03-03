import React, { Component } from 'react';

class ColorBox extends Component {
  render() {
    return (
      <div className="colorBox" style={{backgroundColor: this.props.color}} onClick={this.props.onClick} >
      </div>
    );
  }
}

export default ColorBox;