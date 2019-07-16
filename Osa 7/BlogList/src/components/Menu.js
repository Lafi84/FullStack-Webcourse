import { Link } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';

const Menu = ({ user }) => {
	const style= {
		width: '100%',
		'background-color': 'light-grey'
	};

	const padding = {
		paddingRight: 5
	};
	return (
		<div style={style}>
			<Link style={padding} to="/blogs">Blogs</Link>
			<Link style={padding} to="/users">users</Link>
			{user ? <div>
				{user.name} <button onClick={logout}></button>
			</div> : null}
		</div>
	);
};

const mapStateToProps = (state) => { user: state.user };

export default connect(mapStateToProps)(Menu);
