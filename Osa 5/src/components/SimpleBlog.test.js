import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, getByText } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

describe('<SimpleBlog />', () => {

	const blog = {
		title: 'Testblog 123',
		author: 'Testikäyttäjä',
		url: 'http://www.testurl.fi',
		likes: 13
	};

	let component;
	const mockHandler = jest.fn();

	beforeEach(() => {
		component = render(
			<SimpleBlog blog={blog} onClick={mockHandler}/>
		);
	});

	afterEach(cleanup);

	test('renders its blog text correctly', () => {
		expect(component.container.querySelector('.title-author')).toHaveTextContent('Testblog 123 Testikäyttäjä');
		expect(component.container.querySelector('.likes')).toHaveTextContent('blog has 13 likes');
	});

	// test('at start the children are not displayed', () => {
	// 	const div = component.container.querySelector('.togglableContent');
	//
	// 	expect(div).toHaveStyle('display: none');
	// });
	//
	test('after clicking the button twice the function is fired twice', () => {
		const button = component.getByText('like');
		fireEvent.click(button);
		fireEvent.click(button);

		expect(mockHandler.mock.calls.length).toBe(2);
	});
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