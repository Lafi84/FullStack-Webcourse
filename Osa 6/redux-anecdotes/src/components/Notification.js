import React from 'react';

const Notification = ({ store }) => {
	const _style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	};
	return (
		<div style={_style}>
			{store.getState().notification}
		</div>
	);
};

export default Notification;