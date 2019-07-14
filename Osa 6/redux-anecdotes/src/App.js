import React from 'react';
import { voteAnecdote } from './reducers/anecdoteReducer';
import AnecdoteForm from './components/AnecdoteForm';

const App = (props) => {
	const anecdotes = props.store.getState();

	const vote = (id) => {
		console.log('vote', id);
		props.store.dispatch(voteAnecdote(id));
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
                        has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
			<AnecdoteForm store={props.store}/>
		</div>
	);
};

export default App;