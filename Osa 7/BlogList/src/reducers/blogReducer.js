import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
	console.log('state now: ', state);
	console.log('action', action);

	let newState = state;

	switch (action.type) {
	case 'SET_BLOG':
		newState = state.map(blog => blog.id !== action.data.blog.id ? blog : action.data.blog);
		break;
	case 'ADD_COMMENT':
		newState = state.map(blog => blog.id !== action.data.id ? blog : { ...blog, comments: blog.comments.concat(action.data.comment) });
		break;
	case 'REMOVE_BLOG':
		newState = state.filter(blog => blog.id !== action.data.id);
		break;
	case 'CREATE_BLOG':
		newState = state.concat(action.data);
		break;
	case 'SET_BLOGS':
		newState = [...action.data.blogs];
		break;
	default:
		break;
	}

	newState.sort((a1, a2) => a2.votes - a1.votes);

	return newState;
};

export const initBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch({ type: 'SET_BLOGS', data: { blogs } });
	};
};

export const likeBlog = (blog) => {
	return async (dispatch) => {
		blog.likes++;
		await blogService.updateBlog(blog);
		dispatch({ type: 'SET_BLOG', data: { blog: { ...blog } } });
	};
};

export const addComment = (id, comment) => {
	return async (dispatch) => {
		await blogService.addComment(id, comment);
		dispatch({ type: 'ADD_COMMENT', data: { id, comment } });
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogService.removeBlog(id);
		dispatch({ type: 'REMOVE_BLOG', data: { id: id } });
	};
};

export const voteBLog = (blog) => {
	return async (dispatch) => {
		const _votes = blog.votes + 1;
		const _changedblog = await blogService.voteblog(blog.id, _votes);
		dispatch({
			type: 'SET_BLOG',
			data: {
				blog: {
					content: _changedblog.content,
					id: _changedblog.id,
					votes: _votes
				}
			}
		});
	};
};

export const createblog = (blogString) => {
	return async (dispatch) => {
		const _createdblog = await blogService.createblog(blogString);
		dispatch({
			type: 'CREATE_BLOG',
			data: {
				content: _createdblog.content,
				id: _createdblog.id,
				votes: 0
			}
		});
	};
};

export default blogReducer;