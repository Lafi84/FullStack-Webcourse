import React from 'react';
import { useEffect } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import Users from './components/Users';
import './App.css';
import { connect } from 'react-redux';
import { initSavedUser, logout } from './reducers/userReducer';

function App( { user, initSavedUser, logout } ) {
	console.log('app_user', user);

	useEffect(() => {
		initSavedUser();
	},[]);

	return (
		<div className="App">
			{user ?
				<h3>{user.name} logged in <button onClick={logout}>Logout</button></h3> : null}
			{user ?
				<Users/> :
				<Login/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { initSavedUser, logout })(App);
