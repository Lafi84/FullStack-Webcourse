import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
	render,
	cleanup,
	fireEvent,
	getByText,
	not,
	toBeUndefined,
	toBeNull,
	waitForElement
} from '@testing-library/react';
import Blog from './Blog';
import App from '../App';

jest.mock('../services/blogs');

describe('<Blog />', () => {

	const blog = {
		title: 'Testblog 123',
		author: 'Testikäyttäjä',
		url: 'http://www.testurl.fi',
		likes: 13,
		user: {
			name: 'Timo K',
			username: 'TimoK'
		}
	};

	let component;
	const mockHandler = jest.fn();

	beforeEach(() => {
		component = render(
			<Blog blog={blog} blogUpdated={mockHandler} showDelete={false} showError={mockHandler}/>
		);
	});

	afterEach(cleanup);

	test('renders its blog correctly', () => {
		expect(component.container.querySelector('.title-author')).toHaveTextContent('Testblog 123');
		expect(component.container.querySelector('.title-author')).toHaveTextContent('Testikäyttäjä');
		expect(component.container.querySelector('.likes')).toBeNull();

		expect(component.container.querySelector('.like-button')).toBeNull();
	});

	test('renders its blog correctly after opening blog details', () => {
		const _title = component.container.querySelector('.title');
		expect(component.container.querySelector('.likes')).toBeNull();
		expect(component.container.querySelector('.like-button')).toBeNull();
		expect(component.container.querySelector('.blog-user')).toBeNull();

		fireEvent.click(_title);
		expect(component.container.querySelector('.likes')).not.toBeNull();
		expect(component.container.querySelector('.like-button')).not.toBeNull();
		expect(component.container.querySelector('.blog-user')).not.toBeNull();
	});

	// test('at start the children are not displayed', () => {
	// 	const div = component.container.querySelector('.togglableContent');
	//
	// 	expect(div).toHaveStyle('display: none');
	// });
	//
	// test('after clicking the button twice the function is fired twice', () => {
	// 	const button = component.getByText('like');
	// 	fireEvent.click(button);
	// 	fireEvent.click(button);
	//
	// 	expect(mockHandler.mock.calls.length).toBe(2);
	// });
	//
	// test('toggled content can be closed', () => {
	// 	const button = component.getByText('show...');
	// 	fireEvent.click(button);
	//
	// 	const closeButton = component.getByText('cancel');
	// 	fireEvent.click(closeButton);
	//
	// 	const div = component.container.querySelector('.togglableContent');
	// 	expect(div).toHaveStyle('display: none');
	// });
});

describe('<App />', () => {
	afterEach(cleanup);

	test('if no user logged, login is rendered and blogs are not', async () => {
		const component = render(
			<App/>
		);
		component.rerender(<App/>);

		await waitForElement(
			() => component.getByText('Password')
		);

		expect(component.container.querySelector('.login-form')).not.toBeNull();
		expect(component.container.querySelector('.blogs')).toBeNull();
	});

	test('if  user logged, show blogs', async () => {
		const user = {
			username: 'testuser',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiI1ZDI1ZDE3MTY1MGZjZTQxNWNhOGJjYjEiLCJpYXQiOjE1NjI5MjY5NjZ9.4mCTQNXMxJJeJA98U1GqYt9XDU8XJhhHqqwY8DA3Rig',
			name: 'Testikäyttäjä'
		};

		localStorage.setItem('blogUser', JSON.stringify(user));
		const component = render(
			<App/>
		);
		component.rerender(<App/>);

		await waitForElement(
			() => component.getByText('Type wars')
		);

		expect(component.container.querySelector('.login-form')).toBeNull();
		expect(component.container.querySelector('.blogs')).not.toBeNull();
	});
});