export const showNotification = (text, timeout) => {
	return async (dispatch) => {
		dispatch({ type: 'CHANGE_NOTIFICATION', notification: text });
		await setTimeout(() => {
			dispatch({ type: 'CLEAR_NOTIFICATION' });
		}, timeout);
	};
};

export const changeNotification = (newText) => {
	return { type: 'CHANGE_NOTIFICATION', notification: newText };
};

export const clearNotification = () => {
	return { type: 'CLEAR_NOTIFICATION' };
};

const notificationReducer = (state = 'Initial notification', action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
	case 'CHANGE_NOTIFICATION': state = action.notification;
		break;
	case 'CLEAR_NOTIFICATION': state = '';
		break;
	default:
		break;
	}
	return state;
};

export default  notificationReducer;