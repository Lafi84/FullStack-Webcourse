import loginService from '../services/login';

export const initSavedUser = () => {
	return async (dispatch) => {
		const savedUserJSON = window.localStorage.getItem('blogUser');
		await dispatch({ type: 'LOG_IN', data: { user: JSON.parse(savedUserJSON) } });
	};
};

export const login = (username, password) => {
	return async (dispatch) => {
		const loggedInUser = await loginService.login({ username, password });
		window.localStorage.setItem('blogUser', JSON.stringify(loggedInUser));
		await dispatch({ type: 'LOG_IN', data: { user: loggedInUser } });
	};
};

export const logout = () => {
	return async (dispatch) => {
		window.localStorage.removeItem('blogUser');
		await dispatch({ type: 'LOG_OUT' });
	};
};

const userReducer = (state = null, action) => {
	switch(action.type){
	case 'LOG_IN': state = action.data.user;
		break;
	case 'LOG_OUT': state = null;
		break;
	default:
		break;
	}

	return state;
};

export default userReducer;