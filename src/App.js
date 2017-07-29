import React, {Component} from 'react';
import Camera from './Camera.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {page: "index"};
    }

    render() {
        if (this.state.page === "index") {
            return (
                <div>
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
