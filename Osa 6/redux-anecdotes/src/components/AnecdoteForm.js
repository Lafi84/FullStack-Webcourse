import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, clearNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ store }) => {
	const createNewAnecdote = (e) => {
		e.preventDefault();

		const _newAnecdote = e.target.anecdote.value;
		if(_newAnecdote && _newAnecdote.length>2){
			store.dispatch(createAnecdote(_newAnecdote));
			e.target.anecdote.value = '';

			store.dispatch(changeNotification('Created new anecdote: ' + _newAnecdote));
			setTimeout(() => {
				store.dispatch(clearNotification());
			}, 5000);
		}
	};

	return (
		<div>
			<form onSubmit={createNewAnecdote}>
				<label>
				Anecdote
					<input type="text" name="anecdote"/>
				</label>
				<button type="submit">Create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;