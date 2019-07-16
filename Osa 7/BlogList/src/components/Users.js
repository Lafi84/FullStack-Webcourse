import React from 'react';
import { useEffect } from 'react';
import { initUsers } from '../reducers/usersReducer';
import { connect } from 'react-redux';
import {
	Link
} from 'react-router-dom';

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
				{users ? users.map(user => <tr key={user.id}><td><Link to={'/user/'+user.id}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>) : null}
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