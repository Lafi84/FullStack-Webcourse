import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = ({ store }) => {
	const createNewAnecdote = (e) => {
		e.preventDefault();

		const _newAnecdote = e.target.anecdote.value;
		if(_newAnecdote && _newAnecdote.length>2){
			store.dispatch(createAnecdote(_newAnecdote));
		}
	};

	return (
		<div>
			<h2>New anecdote</h2>
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