import React, { Component } from 'react';
import ColorPicker from './colorPicker'

class Setup extends Component {
  renderLI(i){
    return (
        <li>
          <h3>Player {i}</h3>
          <div className='inputs'>
            <label>Name: </label>
            <input onChange={this.props.onChange} id={'player'+i} value={this.props.names[i-1]}/>
            <label>   Color (pick one): </label>
            <div className="color-preview" style={{backgroundColor: this.props.color[i-1]}}></div>
          </div>
          <ColorPicker onClick={this.props.onClick} key={i} id={'player'+i}/>
        </li>
      )
  }

  errors(){
    if (this.props.error !== '')
      return <div className="alert alert-danger">{this.props.error}</div>
    else
      return ''
  }

  render() {
    return (
      <div className='container'>
        <ul className="setup">
          {this.renderLI(1)}
          {this.renderLI(2)}
          {this.errors()}
          <button className="btn btn-danger" onClick={this.props.cancel}>Cancel</button>
          <button className="btn btn-primary" onClick={this.props.newGame}>Start Game</button>
        </ul>
      </div>
    );
  }
}

export default Setup;