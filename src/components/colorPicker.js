import React, { Component } from 'react';
import ColorBox from './colorbox'
import Colors from './colors'

class ColorPicker extends Component {

  renderColors(s, e){
    var output = []
    for (var i=s; i<e; i++){
      output.push(this.renderColorBox(i));
    }
    return output
  }

  renderColorBox(i){
    return (
        <ColorBox key={i} onClick={()=>{this.props.onClick(this.props.id, Colors[i], i)}}
                  color={Colors[i]}  />
      )
  }

  render() {
    return (
      <div>
        <div className="colors-container">
          {this.renderColors(0,10)}
        </div>
      </div>
    );
  }
}

export default ColorPicker;