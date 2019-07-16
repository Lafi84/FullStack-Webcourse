import React from 'react';
import { useEffect } from 'react';
import Login from './components/Login';
import Users from './components/Users';
import User from './components/User';
import './App.css';
import { connect } from 'react-redux';
import { initSavedUser, logout } from './reducers/userReducer';
import {
	Route, Link, Redirect, withRouter
} from 'react-router-dom';
import Notification from './components/Notification';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import TopMenu from './components/Menu';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;


function App( { user, initSavedUser, logout, ...props } ) {
	console.log('app_user', user);
	console.log('history', props.history);

	useEffect(() => {
		const init = async () => {
			await initSavedUser();
		};
		init();
	},[]);

	useEffect(() => {
		if(!user && props.history.location.pathname !== '/')
			props.history.push('/');
		else if(user && props.history.location.pathname === '/')
			props.history.push('/blogs');
	});

	return (
		<div className="App">
			<Layout>
				<Header>
					{user ?	<TopMenu/> : null}
				</Header>
				<Notification/>
				<Content>
					<Route exact path="/" render={() => <Login/>}/>
					<Route exact path="/users" render={() => <Users/>}/>
					<Route exact path="/blogs" render={() => <Blogs/>}/>
					<Route exact path="/user/:id" render={({ match }) => <User id={match.params.id}/>}/>
					<Route exact path="/blog/:id" render={({ match }) => <Blog id={match.params.id}/>}/>
				</Content>
			</Layout>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { initSavedUser, logout })(withRouter(App));
