import React from 'react';

import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-dracula';

import AceEditor from 'react-ace';
import axios from 'axios';
import './Editor.css';

class Editor extends React.Component {
	constructor() {
		super();
		this.state = {
			code: '',
			result: ''
		};
		this.onChange = this.onChange.bind(this);
		this.runCode = this.runCode.bind(this);
	}

	async onChange(newValue) {
		await this.setState({
			code: newValue
		});
	}

	runCode() {
		let data = { answer: this.state.code };
		axios
			.post('https://zkliu8jgp0.execute-api.us-east-2.amazonaws.com/dev/execute', data)
			.then((res) => {
				this.setState({
					result: res['data']
				});
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		return (
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
						enableBasicAutocompletion={true}
						enableLiveAutocompletion={true}
						enableSnippets={true}
						fontSize={20}
					/>
				</div>
				<div className="col-xs-6">
					<button id="run" onClick={this.runCode}>
						Run
					</button>
					<div id="result">{this.state.result}</div>
				</div>
			</div>
		);
	}
}

export default Editor;