export const changeFilter = (filter) => {
	return { type: 'CHANGE_FILTER', filter };
};

export const clearFilter = () => {
	return { type: 'CLEAR_FILTER' };
};

const filterReducer = (state = '', action) => {
	console.log('state now: ', state);
	console.log('action', action);

	switch (action.type) {
	case 'CHANGE_FILTER': state = action.filter;
		break;
	case 'CLEAR_FILTER': state = '';
		break;
	default:
		break;
	}
	return state;
};

export default filterReducer;