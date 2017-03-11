import React, { Component } from 'react';
import Box from './box'
import '../territories.css'

class Board extends Component {

  renderBoxes(){
    var obj = []
    for (var i=1; i<91; i++){
      obj.push(this.renderBox(i))
    }
    return obj
  }

  renderBox(i){
    return <Box id={i} value={this.props.reserves[i]} key={'box'+i} owner={this.props.owners[i]} />
  }

  render() {
    return (
      <div className="board">
        <div className="territoryBoxes">
          {this.renderBoxes()}
        </div>
      </div>
    );
  }
}

export default Board;
