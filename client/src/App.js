import React, { Component } from 'react';
import Camera from './Camera.js';
import io from 'socket.io-client'

import './App.css';
import Home from './Home'

const styles = {
  height: '100vh',
}

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {page: "home"};
      this.socket = io('localhost:4000')
    }

  changePage = (page) => {
    this.setState({page});
  }

  render() {
    const {page} = this.state

    return (
      <div style={styles}>
        {page === 'home' && <Home changePage={this.changePage}/>}
        {page === 'camera' && <Camera socket={this.socket}/>}
      </div>
    )
  }
}

export default App;
