import React from 'react';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteForm = ({ createAnecdote, showNotification }) => {
	const createNewAnecdote = async (e) => {
		e.preventDefault();

		const _newAnecdote = e.target.anecdote.value;
		if(_newAnecdote && _newAnecdote.length>2){
			e.target.anecdote.value = '';
			createAnecdote(_newAnecdote);

			showNotification('Created new anecdote: ' + _newAnecdote, 5000);
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
	showNotification
};

export default connect(
	null,
	mapDispatchToProps
)(AnecdoteForm);