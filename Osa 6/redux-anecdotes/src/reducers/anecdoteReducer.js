const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteReducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	let newState = state;

	switch (action.type) {
	case 'VOTE':
		newState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : { ...anecdote, votes: anecdote.votes+1 });
		break;
	case 'CREATE_ANECDOTE':
		newState = state.concat(action.data);
		break;
	case 'SET_ANECDOTES':
		newState = [...action.data.anecdotes];
		break;
	default:
		break;
	}

	newState.sort((a1, a2) => a2.votes - a1.votes);

	return newState;
};

export const setAnecdotes = (anecdotes) => {
	return {
		type: 'SET_ANECDOTES',
		data: { anecdotes }
	};
};

export const voteAnecdote = (id) => {
	return {
		type: 'VOTE',
		data: { id }
	};
};

export const createAnecdote = (anecdote) => {
	return {
		type: 'CREATE_ANECDOTE',
		data: {
			content: anecdote.content,
			id: anecdote.id,
			votes: 0
		}
	};
};

export default anecdoteReducer;