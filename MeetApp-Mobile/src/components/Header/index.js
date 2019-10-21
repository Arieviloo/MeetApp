import React from 'react';
import { Container, ImageLogo } from './styles';

import logo from '~/assets/images/meetapp-logo.png';

export default function Header() {
	return (
		<Container>
			<ImageLogo source={logo} />
		</Container>
	);
}
