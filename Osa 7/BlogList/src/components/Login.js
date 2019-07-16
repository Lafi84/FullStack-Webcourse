import React from 'react';
import { useState, useEffect } from 'react';
import Notification from './Notification';
import useField from '../utils/hooks/useField';
import { connect } from 'react-redux';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';

const Login = ({ showNotification, login }) => {
	const username = useField('text');
	const password = useField('password');

	// useEffect(() => {
	// 	const savedUserJSON = window.localStorage.getItem('blogUser');
	// 	if(savedUserJSON){
	// 		setUser(JSON.parse(savedUserJSON));
	// 	}
	// }, []);

	const tryToLogin = async (event) => {
		event.preventDefault();
		try {
			// const _user =
				await login(username.value, password.value);
			// if(_user.error) {
			// 	showError(_user.error);
			// }else {
			// 	window.localStorage.setItem('blogUser', JSON.stringify(_user));
				username.reset();
				password.reset();
				// setUser(_user);
			// }
		} catch (_err) {
			if(_err.message.indexOf('401')>=0)
				showError('Login failed, check username or password');
			else
				showError(_err.message);
		}
	};

	const showError = (errorMessage) => {
		showNotification(errorMessage, NOTIFICATIONTYPE.ERROR, 5000);
	};

	return (
		<div className="login-form">
			<h1>Login to Blog application</h1>
			<Notification/>
			<form onSubmit={tryToLogin}>
				<div className="field">
					<label>
						Username
						<input {...username.getInit()}/>
					</label>
				</div>
				<div className="field">
					<label>
						Password
						<input {...password.getInit()}/>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default connect(
	undefined,
	{ showNotification, login }
)(Login);