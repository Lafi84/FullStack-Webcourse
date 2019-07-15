import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createAnecdote = async (anecdote) => {
	const response = await axios.post(baseUrl, { content: anecdote, id: getId(), votes: 0 });
	return response.data;
};

const voteAnecdote = async (id, votes) => {
	const response = await axios.patch(baseUrl+'/'+id, { votes });
	return response.data;
};

export default { getAll, createAnecdote, voteAnecdote };