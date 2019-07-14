import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ store }) => {
	const _anecdotes = store.getState().anecdotes;
	const _filter = store.getState().filter;

	const vote = (anecdote) => {
		console.log('vote', anecdote.id);
		store.dispatch(voteAnecdote(anecdote.id));

		store.dispatch(changeNotification('Voted for anecdote: ' + anecdote.content));
		setTimeout(() => {
			store.dispatch(clearNotification());
		}, 5000);
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{_anecdotes.filter(a => a.content.toUpperCase().indexOf(_filter.toUpperCase())>=0).map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default AnecdoteList;