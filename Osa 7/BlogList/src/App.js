import React from 'react';
import { useEffect } from 'react';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import './App.css';
import { connect } from 'react-redux';
import { initSavedUser, logout } from './reducers/userReducer';
import {
	Route, Link, Redirect, withRouter
} from 'react-router-dom';

function App( { user, users, initSavedUser, logout, ...props } ) {
	console.log('app_user', user);
	console.log('history', props.history);

	useEffect(() => {
		const init = async () => {
			await initSavedUser();
		};
		init();
	},[]);

	const userById = (id) => {
		return users.find(u => u.id === id);
	}

	if(!user && props.history.location.pathname !== '/')
		props.history.push('/');
	else if(user && props.history.location.pathname === '/')
		props.history.push('/users');

	return (
		<div className="App">
			{user ?	<h3>{user.name} logged in <button onClick={logout}>Logout</button></h3> : null}
			<Route exact path="/" render={() => <Login/>}/>
			<Route exact path="/users" render={() => <Users/>}/>
			<Route exact path="/user/:id" render={({ match }) => <User user={userById(match.params.id)}/>}/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		users: state.users
	};
};

export default connect(mapStateToProps, { initSavedUser, logout })(withRouter(App));
