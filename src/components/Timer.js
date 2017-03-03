import React, { Component, PropTypes } from 'react'
import FormatSeconds from './FormatSeconds'

let offset = null, interval = null

export default class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = { clock: this.props.time, time: '' }
  }

  componentDidMount() {

  }

  componentWillUnmount() {
    this.pause()
  }

  pause() {
    if (interval) {
      clearInterval(interval)
      interval = null
    }
  }

  play() {
    if (!interval) {
      offset = Date.now()
      interval = setInterval(this.update.bind(this), this.props.delay)
      if (this.state.clock === 0) this.setState({clock: this.props.time })
    }
  }

  reset() {
    let clockReset = this.props.time
    this.setState({clock: clockReset })
    let time = FormatSeconds(clockReset)
    this.setState({time: time })
  }

  update() {
    let clock = this.state.clock
    clock -= this.calculateOffset()
    if (clock <= 0){
      clock = 0
      this.pause()
      console.log("time up")
    }
    this.setState({clock: clock })
    let time = FormatSeconds(clock)
    this.setState({time: time })
  }

  calculateOffset() {
    let now = Date.now()
    let newOffset = now - offset
    offset = now
    return newOffset
  }

  render() {
    const timerStyle = {
      margin: "0px",
      padding: "2em"
    };

    const buttonStyle = {
      background: "#fff",
      color: "#666",
      border: "1px solid #ddd",
      margin: "0.25em",
      padding: "0.75em",
      fontWeight: "200"
    };

    const secondsStyles = {
      fontSize: "200%",
      fontWeight: "200",
      lineHeight: "1.5",
      margin: "0px",
      color: "#666"
    };

    return (
      <div style={timerStyle} className="react-timer">
        <h3 style={secondsStyles} className="seconds"> {this.state.time} {this.props.prefix}</h3>
        <br />
        <button onClick={this.reset.bind(this)} style={buttonStyle} >reset</button>
        <button onClick={this.play.bind(this)} style={buttonStyle} >play</button>
        <button onClick={this.pause.bind(this)} style={buttonStyle} >pause</button>
      </div>
    )
  }
}

Timer.propTypes = {
  options: PropTypes.object
}
