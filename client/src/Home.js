import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import startBackgroundGradient from './startBackgroundGradient'

class Home extends Component {
  componentDidMount() {
    startBackgroundGradient();
  }

	render() {
		return (
			<div style={{height: '100vh'}} className="main">
				<p>
						Index
				</p>
				<a onClick={() => this.props.changePage('camera')}> Camera </a>
			</div>
		)
	}
}

export default Home
