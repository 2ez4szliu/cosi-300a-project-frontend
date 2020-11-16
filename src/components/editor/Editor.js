import React from 'react';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';

import AceEditor from 'react-ace';
import axios from 'axios';
import './Editor.css';
import { HOST_URL } from '../../constants';

class Editor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: props.location.code,
			path: props.location.path,
			result: '',
			isloggedin: sessionStorage.getItem('username') === null ? false : true
		};
		console.log(this.state);
		this.onChange = this.onChange.bind(this);
		this.runCode = this.runCode.bind(this);
		this.handlePathChange = this.handlePathChange.bind(this);
		this.submitCode = this.submitCode.bind(this);
	}

	async onChange(newValue) {
		await this.setState({
			code: newValue
		});
	}

	async handlePathChange(event) {
		await this.setState({
			path: event.target.value
		});
		console.log(this.state.path);
	}

	async runCode() {
		let data = { code: this.state.code };
		try {
			let response = await axios.post('https://zkliu8jgp0.execute-api.us-east-2.amazonaws.com/dev/execute', data);
			this.setState({
				result: response['data']
			});
			this.submitCode();
		} catch (e) {
			console.log(e);
		}
	}

	async submitCode() {
		if (sessionStorage.getItem('username') == null) {
			alert('You must first logged in to submit the code!');
			return;
		}
		let submission = {
			path: this.state.path,
			user: sessionStorage.getItem('username'),
			code: this.state.code
		};
		try {
			let response = await axios.post(HOST_URL, submission);
			alert('Successfully submitted!');
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		const isloggedin = this.state.isloggedin;
		return (
			<div>
				{isloggedin && <h1>Welcome {sessionStorage.getItem('username')}</h1>}
				<div className="row">
					<div className="col-xs-6" id="editor">
						<AceEditor
							mode="python"
							theme="dracula"
							onChange={this.onChange}
							name="UNIQUE_ID_OF_DIV"
							editorProps={{
								$blockScrolling: true
							}}
							value={this.state.code}
							width={800}
							height={800}
							enableBasicAutocompletion={true}
							enableLiveAutocompletion={true}
							enableSnippets={true}
							fontSize={20}
						/>
					</div>
					<div className="col-xs-6">
						<div>
							path:
							<input type="text" value={this.state.path} onChange={this.handlePathChange} />
						</div>
						<button id="run" onClick={this.runCode}>
							Run
						</button>
						<div id="result">{this.state.result}</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Editor;
