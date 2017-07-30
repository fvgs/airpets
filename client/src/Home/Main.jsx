import React from 'react';
import {Button} from 'semantic-ui-react';

const buttonContainerStyles = {
	display: 'flex',
};

const buttonStyles = {
	margin: '0.7rem',
};

export default ({ changePage, changeView }) => {
	return (
		<div style={buttonContainerStyles}>
			<Button secondary style={buttonStyles} size="big" onClick={() => {changePage('camera');}}>JOIN WORLD</Button>
			<Button primary style={buttonStyles} size="big" onClick={() => {changeView('createWorld');}}>CREATE WORLD</Button>
		</div>
	);
}
