import React, { Component } from 'react';
import ColorPicker from './colorPicker'

class Setup extends Component {
  renderLI(i){
    return (
        <li>
          <h3>Player {i+1}</h3>
          <div className='inputs'>
            <div>
              <label>Name: </label>
              <input onChange={this.props.onChange} id={i} value={this.props.names[i]}/>
            </div>
            <div>
              <label>Color (pick one):</label>
              <div className="color-preview" style={{backgroundColor: this.props.color[i]}}></div>
            </div>
          </div>
          <ColorPicker onClick={this.props.onClick} id={i}/>
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
      <div className='overlay'>
        <div className='overlay-box'>
          <ul className="setup">
            {this.renderLI(0)}
            {this.renderLI(1)}
            {this.errors()}
            <button className="btn btn-danger" onClick={this.props.cancel}>Cancel</button>
            <button className="btn btn-primary" onClick={this.props.newGame}>Start Game</button>
          </ul>
        </div>
      </div>
    );
  }
}

export default Setup;