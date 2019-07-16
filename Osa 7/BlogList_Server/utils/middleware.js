const logger = require('./logger');

const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method);
	logger.info('Path:  ', request.path);
	logger.info('Body:  ', request.body);
	logger.info('---');
	next();
};

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	logger.error('Middleware error name:', error.name);
	logger.error('Middleware error message:', error.message);

	if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	} else if (error.name === 'MongoError' && error.message.indexOf('E11000') >= 0) {
		return response.status(409).json({ error: 'Username must be unique' });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: 'invalid token' });
	}

	next(error);
};

const tokenExtractor = (error, request, next) => {
	const authorization = request.req.headers['authorization'];
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.req.token = authorization.substring(7);
	}
	next();
};


module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor
};