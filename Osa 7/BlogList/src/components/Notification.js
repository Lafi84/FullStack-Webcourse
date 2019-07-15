import React from 'react';
import { connect } from 'react-redux';

const Notification = ({ message, className }) => {
	console.log('Notification', message, className);
	if (message === null) {
		return null;
	}

	return (
		<div className={className}>
			{message}
		</div>
	);
};

const mapStateToProps = (state) => {
	return { message: state.notification.notification, className: state.notification.notificationType };
};

export default connect(
	mapStateToProps
)(Notification);