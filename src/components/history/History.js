import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { HOST_URL } from '../../constants';

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			submissionMap: new Map(),
			isloggedin: sessionStorage.getItem('username') === null ? false : true
		};

		this.initSubmissionMap = this.initSubmissionMap.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	async componentDidMount() {
		try {
			let submissions = await axios.get(HOST_URL + 'findByUsername', {
				params: {
					username: sessionStorage.getItem('username')
				}
			});
			this.initSubmissionMap(submissions);
		} catch (e) {
			console.log(e);
		}
	}

	async initSubmissionMap(submissions) {
		try {
			let map = new Map();
			await submissions['data'].forEach((submission) => {
				let arr = submission['path'].split('/');
				let folder = arr[1];
				let name = arr[2];
				let time = submission['updatedAt'];
				if (!map.has(folder)) {
					map.set(folder, []);
				}
				map.get(folder).push({ name: name, time: time });
			});
			this.setState({
				submissionMap: map
			});
		} catch (e) {
			console.log(e);
		}
	}

	async handleClick(folder, name) {
		let path = '/' + folder + '/' + name;
		let result = await axios.get(HOST_URL + 'find', {
			params: {
				path: path,
				user: sessionStorage.getItem('username')
			}
		});
		this.props.history.push({
			pathname: '/',
			code: result['data'][0].code,
			path: result['data'][0].path
		});
	}

	render() {
		let isloggedin = this.state.isloggedin;
		let keys = Array.from(this.state.submissionMap.keys());
		return (
			<div>
				{!isloggedin && <h1>You must logged in to see your submission histroy.</h1>}
				{isloggedin && <h1>Submissions of {sessionStorage.getItem('username')}</h1>}
				<div id="submissions">
					{keys.map((folder) => (
						<div>
							<div>{folder}</div>
							<ul>
								{this.state.submissionMap.get(folder).map((item) => (
									<li>
										<Link onClick={() => this.handleClick(folder, item.name)}>{item.name}</Link> ---
										Last Updated: {item.time}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default History;
