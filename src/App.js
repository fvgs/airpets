import React, { Component } from 'react';
import Camera from './Camera.js';

import logo from './logo.svg';
import './App.css';
import Home from './Home'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {page: "home"};
    }

	changePage = (page) => {
		this.setState({page});
	}

  render() {
    if (this.state.page === "home") {
			return <Home changePage={this.changePage}/>
    } else if (this.state.page === 'camera') {
			return <Camera/>
		}
  }
}

export default App;
