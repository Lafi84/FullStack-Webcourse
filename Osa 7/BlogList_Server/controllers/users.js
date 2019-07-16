const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, _id: 1 });
	response.json(users.map(u => u.toJSON()));
});

usersRouter.post('/', async (request, response, next) => {
	try {
		const _body = request.body;
		let _error = null;
		let _errorCode = 400;

		if (!_body.password) {
			_error = 'Password is missing';
		} else if (_body.password.length<3) {
			_error = 'Password is not long enough (3 characters)';
		}

		if (_error && _errorCode) {
			return response.status(400).json({
				error: _error
			});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(_body.password, saltRounds);

		const _user = new User({
			username: _body.username,
			name: _body.name,
			passwordHash: passwordHash,
		});

		const _savedUser = await _user.save();

		response.json(_savedUser);
	} catch (exception) {
		next(exception);
	}
});

module.exports = usersRouter;