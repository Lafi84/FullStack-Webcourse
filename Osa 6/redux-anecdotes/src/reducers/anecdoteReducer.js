import anecdotesService from '../services/anecdotes';

const anecdoteReducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	let newState = state;

	switch (action.type) {
	case 'SET_ANECDOTE':
		newState = state.map(anecdote => anecdote.id !== action.data.anecdote.id ? anecdote : action.data.anecdote);
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

export const initAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({ type: 'SET_ANECDOTES', data: { anecdotes } });
	};
};

export const setAnecdotes = (anecdotes) => {
	return {
		type: 'SET_ANECDOTES',
		data: { anecdotes }
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const _votes = anecdote.votes +1;
		const _changedAnecdote = await anecdotesService.voteAnecdote(anecdote.id, _votes);
		dispatch({
			type: 'SET_ANECDOTE',
			data: {
				anecdote: {
					content: _changedAnecdote.content,
					id: _changedAnecdote.id,
					votes: _votes
				}
			}
		});
	};
};

export const createAnecdote = (anecdoteString) => {
	return async (dispatch) => {
		const _createdAnecdote = await anecdotesService.createAnecdote(anecdoteString);
		dispatch({
			type: 'CREATE_ANECDOTE',
			data: {
				content: _createdAnecdote.content,
				id: _createdAnecdote.id,
				votes: 0
			}
		});
	};
};

export default anecdoteReducer;