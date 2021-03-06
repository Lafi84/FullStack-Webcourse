import React from 'react';
import { useState, useEffect } from 'react';
import login from '../services/login';
import Notification from './Notification';
import useField from '../utils/hooks/useField';

const Login = ({ setUser }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const username = useField('text');
	const password = useField('password');

	useEffect(() => {
		const savedUserJSON = window.localStorage.getItem('blogUser');
		if(savedUserJSON){
			setUser(JSON.parse(savedUserJSON));
		}
	}, []);

	const tryToLogin = async (event) => {
		event.preventDefault();
		try {
			const _user = await login.login({ username: username.value, password: password.value });
			if(_user.error) {
				showError(_user.error);
			}else {
				window.localStorage.setItem('blogUser', JSON.stringify(_user));
				username.reset();
				password.reset();
				setUser(_user);
			}
		} catch (_err) {
			if(_err.message.indexOf('401')>=0)
				showError('Login failed, check username or password');
			else
				showError(_err.message);
		}
	};

	const showError = (errorMessage) => {
		setErrorMessage(errorMessage);

		setTimeout(() => {
			setErrorMessage('');
		}, 5000);
	};

	return (
		<div className="login-form">
			<h1>Login to Blog application</h1>
			{errorMessage ? <Notification className="error" message={errorMessage}/>:''}
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

export default Login;