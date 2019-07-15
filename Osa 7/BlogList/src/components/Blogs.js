import React from 'react';
import { useState, useEffect } from 'react';
import useField from '../utils/hooks/useField';
import blogService from '../services/blogs';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import Blog from './Blog';
import Notification from './Notification';
import Toggable from './Toggable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Blogs = ({ user, logout, showNotification }) => {
	const [blogs, setBlogs] = useState([]);
	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const blogCreateRef = React.createRef();

	Blogs.propTypes = {
		user: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};

	const updateBlogs = (blogs) => {
		console.log('UpdateBlogs');
		//Why is it getting reversed sort when b1.likes - b2.likes?
		blogs = blogs.sort((b1, b2) => b2.likes - b1.likes);
		setBlogs(blogs);
	};

	const getBlogs = async () => {
		console.log('GetBlogs');
		blogService.setToken(user.token);
		try {
			const _blogs = await blogService.getAll();
			updateBlogs(_blogs);
		} catch (_err) {
			showError(_err.message);
		}
	};

	const blogUpdated = (blog) => {
		const _updatedBlogIndex = blogs.findIndex(b => b.id === blog.id);
		const _copyArray = [...blogs];
		if(blog.deleted)
			_copyArray.splice(_updatedBlogIndex, 1);
		else
			_copyArray.splice(_updatedBlogIndex, 1, blog);
		updateBlogs(_copyArray);
	};

	useEffect(() => {
		console.log('useEffect');
		getBlogs();
	}, []);

	const showError = (errorMessage) => {
		showNotification(errorMessage, NOTIFICATIONTYPE.ERROR, 5000);
	};

	const showSuccess = (successMessage) => {
		showNotification(successMessage, NOTIFICATIONTYPE.SUCCESS, 5000);
	};

	const createNewBook = async (e) => {
		e.preventDefault();
		try{
			const createdBook = await blogService.createBook({ title: title.value, author: author.value, url: url.value });
			if(createdBook && createdBook.error){
				showError(createdBook.error);
			}else if(createdBook) {
				blogCreateRef.current.toggleVisibility();
				getBlogs();
				title.reset();
				author.reset();
				url.reset();
				showSuccess(`A new blog ${createdBook.title} by ${createdBook.author} added`);
			}
		} catch (_err) {
			showError(JSON.stringify(_err));
		}
	};

	return (
		<div className="blogs" >
			<h2>Blogs</h2>
			<h3>{user.name} logged in <button onClick={logout}>Logout</button></h3>
			<Notification/>
			<Toggable ref={blogCreateRef} buttonLabel="Add blog">
				<form onSubmit={createNewBook}>
					<div className="field">
						<label>
						Title
							<input {...title.getInit()}/>
						</label>
					</div>
					<div className="field">
						<label>
						Author
							<input {...author.getInit()}/>
						</label>
					</div>
					<div className="field">
						<label>
					Url
							<input {...url.getInit()}/>
						</label>
					</div>
					<button type="submit">Create book</button>
				</form>
			</Toggable>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog} showError={showError} blogUpdated={blogUpdated} showDelete={blog.user.username === user.username} />
			)}
		</div>
	);
};

export default connect(
	undefined,
	{ showNotification }
)(Blogs);