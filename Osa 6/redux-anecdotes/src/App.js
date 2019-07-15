import React from 'react';
import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initAnecdotes } from './reducers/anecdoteReducer';
import { connect } from 'react-redux';

const App = ({ initAnecdotes }) => {
	useEffect(() => {
		initAnecdotes();
	},[]);

	return (
		<div>
			<Notification/>
			<Filter/>
			<AnecdoteForm/>
			<AnecdoteList/>
		</div>
	);
};

export default connect(null, { initAnecdotes })(App)