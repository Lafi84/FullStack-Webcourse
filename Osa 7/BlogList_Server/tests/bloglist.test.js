const listHelper = require('../utils/bloglist_helper');

test('Dummy returns one', () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

const blogs = listHelper.testBlogs;


describe('Total likes', () => {
	test('of non array to be zero', () => {
		expect(listHelper.totalLikes({})).toBe(0);
	});

	test('of empty array is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0);
	});

	const singeBlog = blogs[0];
	test('when list has only one blog equals the likes of that', () => {
		expect(listHelper.totalLikes([singeBlog])).toBe(singeBlog.likes);
	});

	test('of a bigger list is calculated right', () => {
		expect(listHelper.totalLikes(blogs)).toBe(36);
	});
});

describe('Favourite blog', () => {
	test('of non array to be  an empty object', () => {
		expect(listHelper.favouriteBlog({})).toEqual({});
	});

	test('of empty array to be an empty object', () => {
		expect(listHelper.favouriteBlog({})).toEqual({});
	});

	const singeBlog = blogs[0];
	test('when list has only one blog equals that blog', () => {
		expect(listHelper.favouriteBlog([singeBlog])).toEqual(singeBlog);
	});

	test('of a bigger list finds correct one', () => {
		expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[2]);
	});
});

describe('Most blogs', () => {
	test('of non array to be empty an empty object', () => {
		expect(listHelper.mostBlogs({})).toEqual({});
	});

	test('of empty array to be empty object', () => {
		expect(listHelper.mostBlogs({})).toEqual({});
	});

	const singeBlog = blogs[0];
	test('when list has only one blog equals that author', () => {
		expect(listHelper.mostBlogs([singeBlog])).toEqual({ author: singeBlog.author, blogs: 1 });
	});

	test('of a bigger list finds correct author', () => {
		expect(listHelper.mostBlogs(blogs)).toEqual( { author: 'Robert C. Martin', blogs: 3 });
	});
});

describe('Most favourited author', () => {
	test('of non array to be empty an empty object', () => {
		expect(listHelper.favouriteBlogger({})).toEqual({});
	});

	test('of empty array to be empty object', () => {
		expect(listHelper.favouriteBlogger({})).toEqual({});
	});

	const singeBlog = blogs[0];
	test('when list has only one blog equals that author', () => {
		expect(listHelper.favouriteBlogger([singeBlog])).toEqual({ author: singeBlog.author, likes: singeBlog.likes });
	});

	test('of a bigger list finds correct author', () => {
		expect(listHelper.favouriteBlogger(blogs)).toEqual( { author: 'Edsger W. Dijkstra', likes: 17 });
	});
});