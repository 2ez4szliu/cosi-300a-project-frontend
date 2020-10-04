import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">
						Navbar
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link to="/" className="nav-link">
									Editor
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/history" className="nav-link">
									History
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/profile" className="nav-link">
									Profile
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

export default Navbar;