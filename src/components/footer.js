import React, { Component } from 'react';
import $ from 'jquery'

class Footer extends Component {

  content(){
    if (this.props.value[0] === 'reserves')
      return "[Landing Reserves] select a territory on the "+this.props.value[1]+" coast to invade"
    else if (this.props.value[0] === 'march1')
      return "[Marching Troops] select a territory to march troops FROM"
    else if (this.props.value[0] === 'march2')
      return "[Marching Troops] select a territory to march troops TO"
  }

  render() {
    if (this.props.value)
      $('footer').hide().slideDown()
    else
      $('footer').hide()

    return (
      <footer>
        {this.content()}
      </footer>
    );
  }
}

export default Footer;