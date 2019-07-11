import React from 'react';
import { useState } from 'react';
import login from './services/login';

function App() {
	// const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const tryToLogin = async (event) => {
		event.preventDefault();
		const user = await login.login({ username, password });
		// eslint-disable-next-line no-console
		console.log(user);
	};

	return (
		<div className="App">
			<h1>Login to Blog application</h1>
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
}

export default App;
