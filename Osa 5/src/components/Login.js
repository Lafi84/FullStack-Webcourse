import React from 'react';
import { useState, useEffect } from 'react';
import login from '../services/login';
import Notification from './Notification';

const Login = ({ setUser }) => {
	const [errorMessage, setErrorMessage] = useState(null);
	const [username, setUsername] = useState('testuser');
	const [password, setPassword] = useState('1234');

	useEffect(() => {
		const savedUserJSON = window.localStorage.getItem('blogUser');
		if(savedUserJSON){
			setUser(JSON.parse(savedUserJSON));
		}
	});

	const tryToLogin = async (event) => {
		event.preventDefault();
		try {
			const _user = await login.login({ username, password });
			if(_user.error) {
				showError(_user.error);
			}else {
				window.localStorage.setItem('blogUser', JSON.stringify(_user));
				setUsername('');
				setPassword('');
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
		<div>
			<h1>Login to Blog application</h1>
			{errorMessage ? <Notification className="error" message={errorMessage}/>:''}
			<form onSubmit={tryToLogin}>
				<div className="field">
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}/>
					</label>
				</div>
				<div className="field">
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}/>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default Login;