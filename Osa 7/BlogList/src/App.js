import React from 'react';
import { useEffect } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import './App.css';
import { connect } from 'react-redux';
import { initSavedUser } from './reducers/userReducer';

function App( { user } ) {
	console.log('app_user', user);

	useEffect(() => {
		initSavedUser();
	},[]);

	return (
		<div className="App">
			{user ?
				<Blogs/> :
				<Login/>}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { initSavedUser })(App);
