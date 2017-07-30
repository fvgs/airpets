import React from 'react';
import {Image} from 'semantic-ui-react';

const styles = {cursor: 'pointer'};

export default ({setPet}) => {
	return (
		<Image.Group size="small">
			<Image
				style={styles}
				shape="circular"
				src="https://mykombini.com/48718-large/dragon-quest-smile-slime-monster-plush-baby-panther-square-enix.jpg"
				onClick={() => {setPet('A')}}
			/>
			<Image
				style={styles}
				shape="circular"
				src="https://mykombini.com/48718-large/dragon-quest-smile-slime-monster-plush-baby-panther-square-enix.jpg"
				onClick={() => {setPet('B')}}
			/>
			<Image
				style={styles}
				shape="circular"
				src="https://mykombini.com/48718-large/dragon-quest-smile-slime-monster-plush-baby-panther-square-enix.jpg"
				onClick={() => {setPet('C')}}
			/>
		</Image.Group>
	);
};
