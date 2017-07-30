import React, {Component} from 'react';
import Camera from './Camera.js';
import io from 'socket.io-client'

import './App.css';
import Home from './Home'

const styles = {
    height: '100vh',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {page: "home"};
        this.socket = io('localhost:4000');
        this.socket.emit('join room', 'alpha');
        this.socket.on('update objects', (objects) => {
            console.log('received', objects);
            this.setState({objects})
        })
    }

    changePage = (page) => {
        this.setState({page});
    };

    render() {
        const {page} = this.state;

        return (
            <div style={styles}>
                {page === 'home' && <Home changePage={this.changePage}/>}
                {page === 'camera' && <Camera objects={this.state.objects} socket={this.socket}/>}
            </div>
        )
    }
}

export default App;
