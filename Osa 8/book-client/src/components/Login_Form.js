import React, { useState } from 'react';

const LoginForm = ({ show, login, setToken, setPage }) => {
	const [username, setUsername] = useState('testuser');
	const [password, setPassword] = useState('secret');

	if(!show)
		return null;

	const submit = async (event) => {
		event.preventDefault();

		const result = await login({
			variables: { username, password }
		});

		if (result) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem('books-user-token', token);
			setPage('books');
		}
	};

	return (
		<div>
			<form onSubmit={submit}>
				<div>
					username <input
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password <input
						type='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	);
};

export default LoginForm;