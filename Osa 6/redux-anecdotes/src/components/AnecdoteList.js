import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = ({ anecdotes, voteAnecdote, showNotification }) => {
	const vote = (anecdote) => {
		voteAnecdote(anecdote);

		showNotification('Voted for anecdote: ' + anecdote.content, 5000);
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
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	);
};

const anecdotesToShow = (state) => {
	return state.anecdotes.filter(a => a.content.toUpperCase().indexOf(state.filter.toUpperCase()) >= 0)
};

const mapStateToProps = (state) => {
	return {
		anecdotes: anecdotesToShow(state)
	};
};

const mapDispatchToProps = {
	voteAnecdote,
	showNotification
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AnecdoteList);