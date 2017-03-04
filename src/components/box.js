import React, { Component } from 'react';
import $ from 'jquery';

class Box extends Component {
  changeColor(){
    var classNames = $(".territory"+this.props.id)[0].className.baseVal.split(/\s+/);
    var newClass = classNames[0] + ' color'+this.props.owner;
    $('.territory'+this.props.id).removeClass().addClass(newClass);
  }

  renderLabel(){

  }

  render() {
    if (this.props.owner){
      this.changeColor()
    }
    if (typeof this.props.value === 'object'){
      var label1 = this.props.value[0]
      var label2 = (<div className='T-label danger'>
                      {this.props.value[1]}
                    </div>)
    }
    else{
      label1 = this.props.value
      label2 = ''
    }

    return (
      <div id={"territory"+this.props.id} className="countrybox">
        <div className={this.props.value ? "T-label" : ''}>
          {label1}
        </div>
          {label2}
      </div>
    );
  }
}

export default Box;