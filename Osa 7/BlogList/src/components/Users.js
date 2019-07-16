import React from 'react';
import { useEffect } from 'react';
import { initUsers } from '../reducers/usersReducer';
import { connect } from 'react-redux';

const Users = ({ users, initUsers }) => {
	useEffect(() => {
		initUsers();
	}, []);

	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
				<tr><th></th><th><strong>blogs created</strong></th></tr>
				</thead>
				<tbody>
				{users ? users.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.blogs.length}</td></tr>) : null}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		users: state.users
	};
};

export default connect(
	mapStateToProps,
	{ initUsers }
)(Users);