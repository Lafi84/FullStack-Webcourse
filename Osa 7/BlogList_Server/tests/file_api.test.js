const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const listHelper = require('../utils/bloglist_helper');

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const user = new User({ username: 'root', passwordHash: 'mukahash' });
		await user.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			username: 'timok',
			name: 'Timo K',
			password: '1234567',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'Timo Kimo',
			password: '0000',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(409)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Username must be unique');

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if username is missing', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			name: 'Timo Kimo',
			password: '0000',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('`username` is required.');

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if password is missing', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			username: 'timok',
			name: 'Timo Kimo'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Password is missing');

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if username is too short', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			username: 'ti',
			name: 'Timo Kimo',
			password: '0000',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('is shorter than the minimum allowed length');

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if password is too short', async () => {
		const usersAtStart = await listHelper.usersInDb();

		const newUser = {
			username: 'timok',
			name: 'Timo Kimo',
			password: '12',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Password is not long enough');

		const usersAtEnd = await listHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});


afterAll(() => {
	mongoose.connection.close();
});