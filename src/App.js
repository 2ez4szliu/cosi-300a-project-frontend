import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route} from 'react-router-dom';

import './App.css';
import Editor from './components/editor/Editor';
import Navbar from './components/navbar/Navbar';
import History from './components/history/History';
import Profile from './components/profile/Profile';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {}

	render() {
		return (
			<Router>
				<div>
					<div>
						<Navbar />
					</div>
					<Route exact path="/" component={Editor} />
					<Route exact path="/history" component={History} />
					<Route exact path="/profile" component={Profile} />
				</div>
			</Router>
		);
	}
}

export default App;
