import React from 'react';
import { useState } from 'react';
import Login from './components/Login';
import Blogs from './components/Blogs';
import './App.css';

function App() {
	const [errorMessage, setErrorMessage] = useState(null);
	const [user, setUser] = useState(null);

	const showError = (errorMessage) => {
		setErrorMessage(errorMessage);

		setTimeout(() => {
			setErrorMessage('');
		}, 5000);
	};

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

export default App;
