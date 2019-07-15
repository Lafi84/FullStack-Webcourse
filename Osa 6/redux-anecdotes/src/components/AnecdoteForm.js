import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { changeNotification, clearNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = ({ createAnecdote, changeNotification, clearNotification }) => {
	const createNewAnecdote = async (e) => {
		e.preventDefault();

		const _newAnecdote = e.target.anecdote.value;
		if(_newAnecdote && _newAnecdote.length>2){
			e.target.anecdote.value = '';
			const _createdAnecdote = await anecdoteService.createAnecdote(_newAnecdote);
			createAnecdote(_createdAnecdote);

			changeNotification('Created new anecdote: ' + _newAnecdote);
			setTimeout(() => {
				clearNotification();
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

const mapDispatchToProps = {
	createAnecdote,
	changeNotification,
	clearNotification
};

export default connect(
	null,
	mapDispatchToProps
)(AnecdoteForm);