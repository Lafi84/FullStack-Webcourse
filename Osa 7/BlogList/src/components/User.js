import React from 'react';
import { connect } from 'react-redux';

const User = ({ user }) => {
	if ( user === undefined) {
		return null;
	}

	return (
		<div>
			<h2>{user.name}</h2>
			<h3>Added blogs</h3>
			<ul>
				{user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
			</ul>
		</div>
	);
};
const mapStateToProps = (state, props) => {
	return {
		user: (state.users.find(u => u.id === props.id))
	};
};

export default connect(
	mapStateToProps
)(User);