import React, {Component} from 'react';

import Main from './Main';
import CreateWorld from './CreateWorld';
import SelectPet from './SelectPet';
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
		const {changePage, setPet} = this.props;

		return (
			<div style={styles} className="main">
				<div style={titleStyles}>Airpets</div>
				{
					this.state.view === 'main' &&
						<Main changePage={changePage} changeView={this.changeView}/>
				}
				{
					this.state.view === 'createWorld' &&
						<CreateWorld
							createWorld={this.createWorld}
							handleChange={this.handleChange}
						/>
				}
			{
				this.state.view === 'selectPet' && <SelectPet setPet={setPet}/>
			}
			</div>
		)
	}
}

export default Home
