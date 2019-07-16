import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/userReducer';

const Menu = ({ user, logout }) => {
	const style= {
		width: '100%',
		'background-color': 'lightgray',
		padding: '5px'
	};

	const padding = {
		paddingRight: 5
	};
	return (
		<div style={style}>
			<Link style={padding} to="/blogs">Blogs</Link>
			<Link style={padding} to="/users">users</Link>
			{user ? <span>
				{user.name} logged in <button onClick={logout}>Logout</button>
			</span> : null}
		</div>
	);
};

const mapStateToProps = (state) => {return { user: state.user }};

export default connect(mapStateToProps, {logout})(Menu);
