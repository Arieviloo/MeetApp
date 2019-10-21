import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../../components/Header';
import { WrapperLayout, MainWrapper, Content } from './styles';

export default function MasterLayout({ children }) {
	return (
		<WrapperLayout>
			<Header />

			<MainWrapper>
				<Content>{children}</Content>
			</MainWrapper>
		</WrapperLayout>
	);
}

MasterLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
