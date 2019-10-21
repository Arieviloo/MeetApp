import styled from 'styled-components';
import settings from '~/styles/variables';

export const WrapperLayout = styled.div`
	min-height: 100%;
	background: linear-gradient(
		0deg,
		${settings.linearGradientPrimary},
		${settings.linearGradiendSecondary}
	);
`;

export const MainWrapper = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	padding-top: 92px;
`;

export const Content = styled.div`
	width: 90%;
	max-width: 940px;
`;
