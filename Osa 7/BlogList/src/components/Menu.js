import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';
import { Menu, Button } from 'antd';

const TopMenu = ({ user, logout }) => {
	return (
		<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
			<Menu.Item key="1"><Link to="/blogs">Blogs</Link></Menu.Item>
			<Menu.Item key="2"><Link to="/users">Users</Link></Menu.Item>
			{user ? <Menu.Item>
				{user.name} logged in <Button onClick={logout}>Logout</Button>
			</Menu.Item> : null}
		</Menu>
	);
};

const mapStateToProps = (state) => {return { user: state.user };};

export default connect(mapStateToProps, { logout })(TopMenu);
