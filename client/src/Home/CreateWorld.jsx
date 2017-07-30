import React from 'react';
import {Button, Input, Form} from 'semantic-ui-react';

export default ({ createWorld, handleChange }) => {
	return (
		<div>
			<Form onSubmit={createWorld}>
				<Input
					size="large"
					action={<Button primary type="submit">CREATE WORLD</Button>}
					placeholder="Name for your world..."
					onChange={handleChange}
				/>
			</Form>
		</div>
	);
}
