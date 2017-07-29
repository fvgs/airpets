import React, { Component } from 'react';
import Camera from './Camera.js';

import logo from './logo.svg';
import './App.css';
import startBackgroundGradient from './startBackgroundGradient'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {page: "index"};
    }
  componentDidMount() {
    startBackgroundGradient();
  }

  render() {
    if (this.state.page === "index") {
        return (
          <div style={{height: '100vh'}} className="main">
            <p>
                Index
            </p>
            <a onClick={() => this.setState({page: "camera"})}> Camera </a>
          </div>
        );
    }
    return (
      <Camera/>
    );
  }
}

export default App;
