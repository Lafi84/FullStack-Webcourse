import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ notification }) => {
	const _style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	};
	return (
		<div style={_style}>
			{notification}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { notification: state.notification };
};

export default connect(
	mapStateToProps
)(Notification);