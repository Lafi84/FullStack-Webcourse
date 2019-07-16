import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import { Provider } from 'react-redux';
import blogReducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';
import usersReducer from './reducers/usersReducer';
import { BrowserRouter as Router } from 'react-router-dom';


const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogReducer,
	user: userReducer,
	users: usersReducer
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root')
	);
};

render();
store.subscribe(render);