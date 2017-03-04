import React, { Component } from 'react';
import ColorBox from './colorbox'
import Colors from './colors'

class ColorPicker extends Component {

  renderColors(s, e){
    var output = []
    for (var i=s; i<e; i++){
      output.push(this.renderColor(i));
    }
    return output
  }

  renderColor(i){
    return (
      <ColorBox onClick={()=>{this.props.onClick(this.props.id, Colors[i], i)}} color={Colors[i]} key={i} />
      )
  }

  render() {
    return (
      <div>
        <div className="colors-container">
          <div className="first_half">
            {this.renderColors(0,5)}
          </div>
          <div className="second_half">
            {this.renderColors(5,10)}
          </div>
        </div>
      </div>
    );
  }
}

export default ColorPicker;