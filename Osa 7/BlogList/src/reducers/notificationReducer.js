export const NOTIFICATIONTYPE = {
	SUCCESS: 'success',
	ERROR: 'error'
};

export const showNotification = (text, notificationType, timeout) => {
	console.log('Show notification action creator', text, notificationType);
	return async (dispatch) => {
		dispatch({
			type: 'CHANGE_NOTIFICATION', data: {
				notification: text,
				notificationType
			}
		});

		await setTimeout(() => {
			dispatch({ type: 'CLEAR_NOTIFICATION' });
		}, timeout);
	};
};

const notificationReducer = (state = { notification: 'Initial notification',
	notificationType: NOTIFICATIONTYPE.SUCCESS
}, action) => {

	console.log(state);
	console.log(action);
	switch (action.type) {
	case 'CHANGE_NOTIFICATION':
		state = { notification: action.data.notification, notificationType: action.data.notificationType };
		break;
	case 'CLEAR_NOTIFICATION':
		state = '';
		break;
	default:
		break;
	}
	return state;
};

export default notificationReducer;