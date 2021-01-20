import React, { Component } from 'react';

class OrganismErrorBoundary extends Component {
	constructor() {
		super();
		this.state = {
			hasErrored: false,
		};
	}

	static getDerivedStateFromError(error) {
		console.error(error);
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.error(error, info);
	}

	render() {
		return this.state.hasErrored ? (
			<div className="error-wrapper">Unexpected error happened</div>
		) : (
			this.props.children
		);
	}
}

export default OrganismErrorBoundary;
