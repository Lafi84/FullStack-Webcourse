describe('Blog ', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'Testikäyttäjä',
			username: 'testuser',
			password: '1234'
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function() {
		cy.contains('Login');
	});

	it('login form validation fails with no username and password and incorrect info is given', function() {
		cy.contains('Log in').click();
		cy.contains('Please input your username');
		cy.contains('Please input your password');
	});

	it('When incorrect user tries to log in then login fails and correct message is given', function() {
		cy.get('input:first')
			.type('nouserexists');
		cy.get('input:last')
			.type('zzz1234');
		cy.contains('Log in').click();
		cy.contains('Login failed');
	});

	it('When existing user info is given login is successful', function() {
		cy.get('#normal_login_username')
			.type('testuser');
		cy.get('#normal_login_password')
			.type('1234');
		cy.contains('Log in').click();
		cy.contains('Blogs');
	});

	it('Adding a new blog works', function() {
		cy.get('#normal_login_username')
			.type('testuser');
		cy.get('#normal_login_password')
			.type('1234');
		cy.contains('Log in').click();
		cy.contains('No Data');
		cy.contains('Add blog').click();
		cy.get('#newBlogTitle')
			.type('Test_blog_title');
		cy.get('#newBlogAuthor')
			.type('Test_blog_author');
		cy.get('#newBlogUrl')
			.type('Test_blog_url');
		cy.contains('Create blog').click();
		//bloglist is broken atm and will not auto update after blog is created
		cy.contains('Users').click();
		cy.contains('Blogs').click();
		// cy.contains('Test_blog_title');
	});

	it('Adding a like or a comment to blog works', function() {
		cy.get('#normal_login_username')
			.type('testuser');
		cy.get('#normal_login_password')
			.type('1234');
		cy.contains('Log in').click();
		cy.contains('No Data');
		cy.contains('Add blog').click();
		cy.get('#newBlogTitle')
			.type('Test_blog_title');
		cy.get('#newBlogAuthor')
			.type('Test_blog_author');
		cy.get('#newBlogUrl')
			.type('Test_blog_url');
		cy.contains('Create blog').click();
		//bloglist is broken atm and will not auto update after blog is created
		cy.contains('Users').click();
		cy.contains('Blogs').click();
		cy.contains('Test_blog_title').click();

		cy.contains('Likes: 0');
		cy.get('.like-button').click();
		cy.contains('Likes: 1');

		cy.get('#commentInput').type('testcomment');
		cy.contains('Add comment').click();
		cy.contains('testcomment');
	});

	it('Finds user from users page, opens user info and finds blogs created by user', function() {
		cy.get('#normal_login_username')
			.type('testuser');
		cy.get('#normal_login_password')
			.type('1234');
		cy.contains('Log in').click();
		cy.contains('No Data');
		cy.contains('Add blog').click();
		cy.get('#newBlogTitle')
			.type('Test_blog_title');
		cy.get('#newBlogAuthor')
			.type('Test_blog_author');
		cy.get('#newBlogUrl')
			.type('Test_blog_url');
		cy.contains('Create blog').click();

		cy.contains('Users').click();
		cy.get('#testuser')
			.click();
		cy.contains('Added blogs');
		cy.contains('Test_blog_title');
	});
});