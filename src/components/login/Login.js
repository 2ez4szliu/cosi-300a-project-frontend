import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	handleInputChange = (event) => {
		const { value, name } = event.target;
		this.setState({
			[name]: value
		});
	};
	onSubmit = (event) => {
		event.preventDefault();
		fetch('http://localhost:4000/authenticate', {
			method: 'POST',
			body: JSON.stringify(this.state),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				if (res.status === 200) {
					alert('Successfully logged in!');
					sessionStorage.setItem('username', this.state.username);
					this.props.history.push('/');
				} else {
					const error = new Error(res.error);
					throw error;
				}
			})
			.catch((err) => {
				console.error(err);
				alert('Error logging in please try again');
			});
	};
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<h1>Login</h1>
				<input
					type="username"
					name="username"
					placeholder="Enter username"
					value={this.state.username}
					onChange={this.handleInputChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Enter password"
					value={this.state.password}
					onChange={this.handleInputChange}
					required
				/>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default Login;
