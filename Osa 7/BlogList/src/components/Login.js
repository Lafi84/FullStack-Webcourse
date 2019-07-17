import React from 'react';
import { connect } from 'react-redux';
import { showNotification, NOTIFICATIONTYPE } from '../reducers/notificationReducer';
import { login } from '../reducers/userReducer';
import { Button, Form, Icon, Input } from 'antd';

const Login = ({ showNotification, login, ...props }) => {
	// const username = useField('text');
	// const password = useField('password');

	// useEffect(() => {
	// 	const savedUserJSON = window.localStorage.getItem('blogUser');
	// 	if(savedUserJSON){
	// 		setUser(JSON.parse(savedUserJSON));
	// 	}
	// }, []);

	const tryToLogin = (event) => {
		event.preventDefault();
		props.form.validateFields(async (err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);

				try {
					await login(values.username, values.password);
				} catch (_err) {
					if(_err.message.indexOf('401')>=0)
						showError('Login failed, check username or password');
					else
						showError(_err.message);
				}
			}
		});
	};

	const showError = (errorMessage) => {
		showNotification(errorMessage, NOTIFICATIONTYPE.ERROR, 5000);
	};

	const { getFieldDecorator } = props.form;

	return (
		<Form onSubmit={tryToLogin} className="login-form">
			<Form.Item>
				{getFieldDecorator('username', {
					rules: [{ required: true, message: 'Please input your username!' }],
				})(
					<Input
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						placeholder="Username"
					/>,
				)}
			</Form.Item>
			<Form.Item>
				{getFieldDecorator('password', {
					rules: [{ required: true, message: 'Please input your password!' }],
				})(
					<Input
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						placeholder="Password"
					/>,
				)}
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
						Log in
				</Button>
			</Form.Item>
		</Form>
	);
};

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(
	undefined,
	{ showNotification, login }
)(WrappedNormalLoginForm);