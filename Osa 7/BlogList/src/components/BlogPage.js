import React from 'react';
import { connect } from 'react-redux';
import { likeBlog } from '../reducers/blogReducer';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';

const BlogPage = ({ blog, likeBlog }) => {
	console.log('Blog Page', blog);
	if ( blog === undefined) {
		return <div>no blog</div>;
	}

	const handleLike = () => {
		likeBlog(blog);
		showNotification('Liked blog ' + blog.title, NOTIFICATIONTYPE.SUCCESS, 5000);
	};

	return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<div className="likes">
				Likes: {blog.likes} {blog.liked ? null :
					<button onClick={handleLike} className="like-button">Like <span role="img" aria-label="thumbsup">👍</span></button>}
			</div>
			<div>Added by {blog.user.name}</div>
		</div>
	);
};
const mapStateToProps = (state, props) => {
	return {
		blog: (state.blogs.find(b => b.id === props.id))
	};
};

export default connect(
	mapStateToProps,
	{ likeBlog, showNotification }
)(BlogPage);