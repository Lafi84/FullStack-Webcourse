const User = require('../models/user');
const _ = require('lodash');

const testBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
];

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	if(!(blogs instanceof Array))
		return 0;
	else if(blogs.length === 0)
		return 0;

	let reduced = blogs.reduce(function(total, blog) {
		return { likes: total.likes + blog.likes };
	});

	return reduced.likes;
};

const favouriteBlog = (blogs) => {
	if(!(blogs instanceof Array))
		return {};
	else if(blogs.length === 0)
		return {};

	let favouriteBlog = blogs[0];
	blogs.forEach(blog => {
		if(favouriteBlog.likes < blog.likes)
			favouriteBlog = blog;
	});
	return favouriteBlog;
};

const usersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

const mostBlogs = (blogs) => {
	if(!(blogs instanceof Array))
		return {};
	else if(blogs.length === 0)
		return {};

	const hashmap = _.reduce(blogs, function(hash, value) {
		const key = value['author'];
		if(hash[key])
			hash[key].push(value);
		else
			hash[key] = [value];

		return hash;
	}, {});
	let _maxBlogs = 0;
	let _maxBlogsAuthor = {};

	_.forOwn(hashmap, (bookList, author) => {
		if(bookList.length > _maxBlogs){
			_maxBlogs = bookList.length;
			_maxBlogsAuthor = author;
		}
	});
	return { author: _maxBlogsAuthor, blogs: _maxBlogs };
};

const favouriteBlogger = (blogs) => {
	if(!(blogs instanceof Array))
		return {};
	else if(blogs.length === 0)
		return {};

	const hashmap = _.reduce(blogs, function(hash, value) {
		const key = value['author'];
		if(hash[key])
			hash[key].push(value);
		else
			hash[key] = [value];

		return hash;
	}, {});
	let _maxFavourited = 0;
	let _maxFavouritedAuthor = {};

	_.forOwn(hashmap, (bookList, author) => {
		const _totalLikes = _.sumBy(bookList, book => book.likes);
		if(_totalLikes > _maxFavourited){
			_maxFavourited = _totalLikes;
			_maxFavouritedAuthor = author;
		}
	});
	return { author: _maxFavouritedAuthor, likes: _maxFavourited };
};

module.exports = {
	testBlogs,
	dummy,
	totalLikes,
	favouriteBlog,
	usersInDb,
	mostBlogs,
	favouriteBlogger
};