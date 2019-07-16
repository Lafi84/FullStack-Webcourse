import React from 'react';
import { useEffect } from 'react';
import { initUsers } from '../reducers/usersReducer';
import { connect } from 'react-redux';
import {
	Link
} from 'react-router-dom';
import { Table, PageHeader } from 'antd';

const Users = ({ users, initUsers }) => {
	useEffect(() => {
		initUsers();
	}, []);

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			// eslint-disable-next-line react/display-name
			render: (name, user) => <Link to={'/user/'+user.id}>{name}</Link>,
		},
		{
			title: 'Total blogs',
			dataIndex: 'blogs.length',
			key: 'blogs',
		},
	];

	return (
		<div>
			<PageHeader title="Users"/>
			<Table dataSource={users} columns={columns}/>
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