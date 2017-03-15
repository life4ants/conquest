import React, { Component } from 'react';

class Box extends Component {
  render() {
    var label = []
    for(let i=0; i<3; i++){
      if (this.props.value[i] !== 0){
        label[i] = (
          <div className={'label'+i}>
            {this.props.value[i]}
          </div>)
      }
      else
        label[i] = ''
    }

    return (
      <div id={"territory"+this.props.id} className="countrybox">
        {label[0]}
        {label[1]}
        {label[2]}
      </div>
    );
  }
}

export default Box;