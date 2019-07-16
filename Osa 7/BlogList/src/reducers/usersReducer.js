import usersService from '../services/users';

const usersReducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);
	let newState = state;

	switch (action.type) {
	case 'SET_USERS':
		newState = [...action.data.users];
		break;
	default:
		break;
	}

	return newState;
};

export const initUsers = () => {
	return async (dispatch) => {
		const users = await usersService.getAll();
		await dispatch({ type: 'SET_USERS', data: { users: users } });
	};
};

export default usersReducer;