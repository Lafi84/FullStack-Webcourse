import React from 'react';
import { useState, useEffect } from 'react';
import blogService from '../services/blogs';
import Blog from './Blog';
import Notification from './Notification';

const Blogs = ({ user, logout }) => {
	const [blogs, setBlogs] = useState([]);
	const [newBook, setNewBook] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const [successMessage, setSuccessMessage] = useState('');

	const getBlogs = async () => {
		blogService.setToken(user.token);
		try {
			const _blogs = await blogService.getAll();
			setBlogs(_blogs);
		} catch (_err) {
			showError(_err.message);
		}
	};

	useEffect(() => {
		getBlogs();
	}, []);

	const showError = (errorMessage) => {
		setErrorMessage(errorMessage);

		setTimeout(() => {
			setErrorMessage('');
		}, 5000);
	};

	const showSuccess = (successMessage) => {
		setSuccessMessage(successMessage);

		setTimeout(() => {
			setSuccessMessage('');
		}, 5000);
	};

	const createNewBook = async (e) => {
		e.preventDefault();
		try{
			const createdBook = await blogService.createBook(newBook);
			if(createdBook && createdBook.error){
				showError(createdBook.error);
			}else if(createdBook) {
				getBlogs();
				setNewBook({});
				showSuccess(`A new blog ${createdBook.title} by ${createdBook.author} added`);
			}
		} catch (_err) {
			showError(JSON.stringify(_err));
		}
	};
	
	return (
		<div >
			<h2>Blogs</h2>
			<h3>{user.name} logged in <button onClick={logout}>Logout</button></h3>
			{errorMessage ? <Notification className="error" message={errorMessage}/>:''}
			{successMessage ? <Notification className="success" message={successMessage}/>:''}
			<form onSubmit={createNewBook}>
				<div className="field">
					<label>
						Title
						<input
							type="text"
							value={newBook.title || ''}
							onChange={e => setNewBook({ ...newBook, title: e.target.value })}/>
					</label>
				</div>
				<div className="field">
					<label>
						Author
						<input
							type="text"
							value={newBook.author || ''}
							onChange={e => setNewBook({ ...newBook, author: e.target.value })}/>
					</label>
				</div>
				<div className="field">
					<label>
					Url
						<input
							type="text"
							value={newBook.url || ''}
							onChange={e => setNewBook({ ...newBook, url: e.target.value })}/>
					</label>
				</div>
				<button type="submit">Create book</button>
			</form>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} />
			)}
		</div>
	);
};

export default Blogs;