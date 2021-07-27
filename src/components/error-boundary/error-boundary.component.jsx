import React, { Component } from 'react';

import { ErrorImageOverlay, ErrorImageContainer, ErrorImageText } from './error-boundary.styles';

class ErrorBoundary extends Component {
    
	state = {
      	hasErrored: false
    };

	static getDerivedStateFromError(error) { // getDerivedStateFromError allows catching the errors
		// process the error
		return { hasErrored: true };
	}

	componentDidCatch(error, info) {
		console.log(error);
		// this.setState({ 		// the same result, but there is no need for "static getDerivedStateFromError()"
		// 	hasErrored: true
		// });
	}

	render() {
		if (this.state.hasErrored) {
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl='https://i.imgur.com/DWO5Hzg.png' />
					<ErrorImageText>Sorry, something went wrong!</ErrorImageText>
				</ErrorImageOverlay>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;