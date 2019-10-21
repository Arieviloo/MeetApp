import React from 'react';
import { Spinner } from './styles';

const Loading = () => {
	return (
		<Spinner>
			<div className="rect1" />
			<div className="rect2" />
			<div className="rect3" />
			<div className="rect4" />
			<div className="rect5" />
		</Spinner>
	);
};

export default Loading;
