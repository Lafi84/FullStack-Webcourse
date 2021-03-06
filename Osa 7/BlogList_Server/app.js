const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

//MongoDB connect
let mongoUrl = config.MONGODB_URI;
if (config.NODE_ENV === 'test') {
	mongoUrl = config.TEST_MONGODB_URI;
}
logger.info('Connecting to', mongoUrl);

mongoose.connect(mongoUrl, { useNewUrlParser: true })
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connection to MongoDB:', error.message);
	});

//Routing
app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

if (config.NODE_ENV === 'test') {
	console.log('adding test routes');
	const testingRouter = require('./controllers/testing');
	app.use('/api/testing', testingRouter);
}

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;