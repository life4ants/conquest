import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        {this.props.value}
      </footer>
    );
  }
}

export default Footer;