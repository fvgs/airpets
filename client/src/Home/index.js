import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import startBackgroundGradient from '../startBackgroundGradient'

const styles = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}

class Home extends Component {
  componentDidMount() {
    startBackgroundGradient();
  }

	render() {
		return (
			<div style={styles} className="main">
				<Button onClick={() => this.props.changePage('camera')}>Camera</Button>
			</div>
		)
	}
}

export default Home
