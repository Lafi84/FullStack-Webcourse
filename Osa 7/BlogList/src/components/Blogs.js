import React from 'react';
import { useEffect } from 'react';
import useField from '../utils/hooks/useField';
import blogService from '../services/blogs';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import Blog from './Blog';
import Toggable from './Toggable';
import { connect } from 'react-redux';
import { initBlogs } from '../reducers/blogReducer';
import { Link } from 'react-router-dom';

const Blogs = ({ user, blogs, showNotification, initBlogs }) => {
	console.log('Blogs:', user);
	const title = useField('text');
	const author = useField('text');
	const url = useField('text');

	const blogCreateRef = React.createRef();

	useEffect(() => {
		if(user) {
			blogService.setToken(user.token);
			initBlogs();
		}
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
				<div className="blog-post" key={blog.id}>
				<Link to={'/blog/'+blog.id}>{blog.title}</Link>
				</div>
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