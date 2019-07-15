import React from 'react';
import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdotesService from './services/anecdotes';
import { setAnecdotes } from './reducers/anecdoteReducer';
import { connect } from "react-redux";

const App = ({ setAnecdotes }) => {
	useEffect(() => {
		anecdotesService
			.getAll().then(anecdotes => setAnecdotes(anecdotes));
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

export default connect(null, { setAnecdotes })(App)