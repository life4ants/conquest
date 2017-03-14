import React, { Component } from 'react';
import ColorBox from './colorbox'
import Colors from './colors'

class ColorPicker extends Component {

  renderColors(s, e){
    var output = []
    for (var i=s; i<e; i+=2){
      output.push(this.renderPair(i, i+1));
    }
    return output
  }

  renderPair(a, b){
    return (
      <div key={a} >
        <ColorBox onClick={()=>{this.props.onClick(this.props.id, Colors[a], a)}}
                  color={Colors[a]}  />
        <ColorBox onClick={()=>{this.props.onClick(this.props.id, Colors[b], b)}}
                  color={Colors[b]}  />
      </div>
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