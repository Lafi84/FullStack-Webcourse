import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import { deleteBlog, likeBlog} from '../reducers/blogReducer';

const Blog = ({ showDelete, blog, showNotification, likeBlog, deleteBlog }) => {
	const [opened, setOpened] = useState(false);

	Blog.propTypes = {
		showDelete: PropTypes.bool.isRequired
	};

	const handleLike = () => {
		likeBlog(blog);
		showNotification('Liked blog ' + blog.title, NOTIFICATIONTYPE.SUCCESS, 5000);
	};

	const toggleOpened = () => {
		setOpened(!opened);
	};

	const removeBlog = () => {
		deleteBlog(blog.id);
		showNotification('Deleted blog ' + blog.title, NOTIFICATIONTYPE.SUCCESS, 5000);
	};

	return (
		<div className="blog-post">
			<div className="title-author"><span onClick={toggleOpened} className="title">{blog.title}</span> by {blog.author}</div>
			{opened ?
				<div>
					<div>
						{blog.url}
					</div>
					<div className="likes">
						Likes: {blog.likes} {blog.liked ? null :
							<button onClick={handleLike} className="like-button">Like <span role="img" aria-label="thumbsup">👍</span></button>}
					</div>
					<div className="blog-user">
						Added by {blog.user.name}
					</div>
					{showDelete ? <button onClick={removeBlog}>Remove</button> : null}
				</div> : null}
		</div>
	);
};

export default connect(
	undefined,
	{ showNotification, likeBlog, deleteBlog }
)(Blog);