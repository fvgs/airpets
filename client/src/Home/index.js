import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import startBackgroundGradient from '../startBackgroundGradient'

const styles = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
};

const titleStyles = {
	color: '#ffffff',
	fontSize: '8rem',
	marginBottom: '8rem',
	fontFamily: 'Voltaire, sans-serif',
};

const buttonStyles = {
	margin: '0.7rem',
};

const buttonContainerStyles = {
	display: 'flex',
};

class Home extends Component {
  componentDidMount() {
    startBackgroundGradient();
  }

	render() {
		return (
			<div style={styles} className="main">
				<div style={titleStyles}>Airpets</div>
				<div style={buttonContainerStyles}>
					<Button secondary style={buttonStyles} size="big" onClick={() => this.props.changePage('camera')}>JOIN WORLD</Button>
					<Button primary style={buttonStyles} size="big" onClick={() => {}}>CREATE WORLD</Button>
			</div>
			</div>
		)
	}
}

export default Home
