import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Form, Input} from 'semantic-ui-react';

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
	state = {view: 'main', worldName: ''}

  componentDidMount() {
    startBackgroundGradient();
  }

	changeView = (view) => {
		this.setState({view});
	}

	handleChange = (_, {value}) => {
		this.setState({worldName: value});
	}

	createWorld = () => {
		this.props.socket.emit('join room', this.state.worldName);
		console.log('joined', this.state.worldName);
		this.changeView('selectPet');
	}

	render() {
		const {changePage} = this.props;

		return (
			<div style={styles} className="main">
				<div style={titleStyles}>Airpets</div>
			{
				this.state.view === 'main' &&
					<div style={buttonContainerStyles}>
						<Button secondary style={buttonStyles} size="big" onClick={() => {changePage('camera');}}>JOIN WORLD</Button>
						<Button primary style={buttonStyles} size="big" onClick={() => {this.changeView('createWorld');}}>CREATE WORLD</Button>
					</div>
			}
			{
				this.state.view === 'createWorld' &&
					<div>
						<Form onSubmit={this.createWorld}>
							<Input
								size="large"
								action={<Button primary type="submit">CREATE WORLD</Button>}
								placeholder="Name for your world..."
								onChange={this.handleChange}
							/>
						</Form>
					</div>
			}
			</div>
		)
	}
}

export default Home
