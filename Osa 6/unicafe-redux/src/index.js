import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
	const change = (type) => {
		return () => {
			store.dispatch({ type });
		};
	};

	return (
		<div>
			<button onClick={change('GOOD')}>hyvä</button>
			<button onClick={change('OK')}>neutraali</button>
			<button onClick={change('BAD')}>huono</button>
			<button onClick={change('ZERO')}>nollaa tilastot</button>
			<div>hyvä {store.getState().good}</div>
			<div>neutraali {store.getState().ok}</div>
			<div>huono {store.getState().bad}</div>
		</div>
	);
};

const renderApp = () => {
	ReactDOM.render(<App/>, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
