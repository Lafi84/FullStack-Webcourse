import React from 'react';
import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ showDelete, blog, blogUpdated, showError }) => {
	const [opened, setOpened] = useState(false);

	const likeBlog = async () => {
		try {
			blog.likes = blog.likes + 1;
			const updatedBlog = await blogService.updateBlog(blog);
			if (updatedBlog.error) {
				showError(updatedBlog.error);
			} else {
				blog.liked = true;
				blogUpdated(blog);
			}
		} catch (_err) {
			showError(_err.message);
		}
	};

	const toggleOpened = () => {
		setOpened(!opened);
	};

	const removeBlog = async () => {
		const response = window.confirm(`Are you sure you want to remove blogpost ${blog.title} ?`);
		if(response){
			try {
				const updatedBlog = await blogService.removeBlog(blog);
				if (updatedBlog.error) {
					showError(updatedBlog.error);
				} else {
					blog.deleted = true;
					blogUpdated(blog);
				}
			} catch (_err) {
				showError(_err.message);
			}
		}
	};

	return (
		<div className="blog-post">
			<span onClick={toggleOpened}>{blog.title}</span> by {blog.author}
			{opened ?
				<div>
					<div>
						{blog.url}
					</div>
					<div>
						Likes: {blog.likes} {blog.liked ? null : <button onClick={likeBlog}>Like 👍</button>}
					</div>
					<div>
						Added by {blog.user.name}
					</div>
					{showDelete ? <button onClick={removeBlog}>Remove</button> : null}
				</div> : null}
		</div>
	);
};

export default Blog;