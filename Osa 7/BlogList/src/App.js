import React from 'react';
import { useState, useEffect } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import './App.css';
import { initBlogs } from './reducers/blogReducer';
import { connect } from 'react-redux';

function App( { initBlogs } ) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		initBlogs();
	},[]);

	const logout = () => {
		window.localStorage.removeItem('blogUser');
		setUser(null);
	};

	return (
		<div className="App">
			{user ?
				<Blogs user={user} logout={logout}/> :
				<Login setUser={setUser}/>}
		</div>
	);
}

export default connect(null, { initBlogs })(App);
