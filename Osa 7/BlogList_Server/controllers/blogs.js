const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogsRouter.get('/', async (request, response, next) => {
	try {
		const _blogs = await Blog.find({}).populate('user', { username: 1, name: 1, _id: 1 });
		return response.json(_blogs);
	}catch (_err) {
		next(_err);
	}
});


blogsRouter.post('/', async (request, response, next) => {
	const _token = request.token;
	try{
		if (!_token) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}
		const decodedToken = jwt.verify(_token, config.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const _user = await User.findById(decodedToken.id);
		const _blog = new Blog({ user: _user._id, ...request.body });

		const _newBlog = await _blog.save();
		_user.blogs.push(_newBlog._id);
		await _user.save();
		return response.status(201).json(_newBlog);
	}catch (_err){
		next(_err);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	const _token = request.token;

	try{
		if (!_token) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}
		const decodedToken = jwt.verify(_token, config.SECRET);

		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const _blogToBeDeleted = await Blog.findById(request.params.id);
		if(_blogToBeDeleted){
			if(_blogToBeDeleted.user.toString() !== decodedToken.id)
				return response.status(403).json({ error: 'Unauthorized user' });
			else
				await _blogToBeDeleted.remove();
		}

		return response.status(204).end();
	}catch (_err) {
		next(_err);
	}
});

blogsRouter.put('/:id', async (request, response, next) => {
	const _body = request.body;

	const _blog = {
		likes: _body.likes
	};

	try {
		const _updatedNote = await Blog.findByIdAndUpdate(request.params.id, _blog, { new: true });
		return response.json(_updatedNote);
	}catch (_err){
		next(_err);
	}
});


module.exports = blogsRouter;