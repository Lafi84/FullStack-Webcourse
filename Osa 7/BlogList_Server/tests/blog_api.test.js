const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');
const listHelper = require('../utils/bloglist_helper');

const testBlogs = listHelper.testBlogs;

beforeEach(async () => {
	await Blog.remove({});

	for (let blog of testBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body.length).toBe(testBlogs.length);
});

test('a specific blog is within the returned notes', async () => {
	const response = await api.get('/api/blogs');

	const contents = response.body.map(r => r.title);
	expect(contents).toContain(
		'Go To Statement Considered Harmful'
	);
});

test('id-attribute is defined for blogs', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body[0].id).toBeDefined();
});

test('a blog can be added', async () => {
	await api.post('/api/blogs').send({
		title: 'Test title',
		author: 'Timo K',
		url: 'http://www.google.fi',
		likes: 99,
	}).expect(201);

	const response = await api.get('/api/blogs');

	expect(response.body.length).toBe(testBlogs.length+1);

	const contents = response.body.map(r => r.title);
	expect(contents).toContain(
		'Test title'
	);
});

test('a blog added without likes has 0 likes as default', async () => {
	await api.post('/api/blogs').send({
		title: 'NoLikes',
		author: 'Timo K',
		url: 'http://www.google.fi'
	}).expect(201);

	const response = await api.get('/api/blogs');

	expect(response.body.length).toBe(testBlogs.length+1);

	const contents = response.body.filter(blog => blog.title === 'NoLikes');
	expect(contents.length).toBe(1);
	expect(contents[0].likes).toBe(0);
});

test('a blog added without title responds with 400 status', async () => {
	await api.post('/api/blogs').send({
		author: 'Timo K',
		url: 'http://www.google.fi'
	}).expect(400);
});

test('a blog added without url responds with 400 status', async () => {
	await api.post('/api/blogs').send({
		title: 'Test title',
		author: 'Timo K'
	}).expect(400);
});

afterAll(() => {
	mongoose.connection.close();
});