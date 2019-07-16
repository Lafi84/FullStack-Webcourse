require('dotenv').config();

// eslint-disable-next-line no-undef
let PORT = process.env.PORT;

// eslint-disable-next-line no-undef
let MONGODB_URI = process.env.MONGODB_URI;

// eslint-disable-next-line no-undef
let NODE_ENV = process.env.NODE_ENV;

// eslint-disable-next-line no-undef
let TEST_MONGODB_URI = process.env.TEST_MONGODB_URI;

// eslint-disable-next-line no-undef
let SECRET = process.env.SECRET;

module.exports = {
	MONGODB_URI,
	TEST_MONGODB_URI,
	PORT,
	NODE_ENV,
	SECRET
};