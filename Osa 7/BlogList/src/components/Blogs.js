import React from 'react';
import { useEffect } from 'react';
import useField from '../utils/hooks/useField';
import blogService from '../services/blogs';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import Blog from './Blog';
import Notification from './Notification';
import Toggable from './Toggable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initBlogs } from '../reducers/blogReducer';
import { logout } from '../reducers/userReducer';

const Blogs = ({ user, blogs, showNotification, initBlogs }) => {
	console.log('Blogs:', blogs);
	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const blogCreateRef = React.createRef();

	useEffect(() => {
		blogService.setToken(user.token);
		initBlogs();
	}, []);

	Blogs.propTypes = {
		user: PropTypes.object.isRequired,
		logout: PropTypes.func.isRequired
	};

	const updateBlogs = () => {
		console.log('UpdateBlogs');
		//Why is it getting reversed sort when b1.likes - b2.likes?
		blogs = blogs.sort((b1, b2) => b2.likes - b1.likes);
	};

	const showError = (errorMessage) => {
		showNotification(errorMessage, NOTIFICATIONTYPE.ERROR, 5000);
	};

	const showSuccess = (successMessage) => {
		showNotification(successMessage, NOTIFICATIONTYPE.SUCCESS, 5000);
	};

	const createNewBook = async (e) => {
		e.preventDefault();
		try{
			const createdBook = await blogService.createBlog({ title: title.value, author: author.value, url: url.value });
			if(createdBook && createdBook.error){
				showError(createdBook.error);
			}else if(createdBook) {
				blogCreateRef.current.toggleVisibility();
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
				<Blog key={blog.id} blog={blog} showDelete={blog.user.username === user.username} />
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user
	};
};

export default connect(
	mapStateToProps,
	{ showNotification, initBlogs }
)(Blogs);