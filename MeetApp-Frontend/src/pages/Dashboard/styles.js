import styled from 'styled-components';
import settings from '~/styles/variables';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ListMeet = styled.ul`
	margin-top: 40px;
`;

export const NotMeet = styled.div`
	align-items: center;
	justify-content: flex-start;
	flex-direction: row;
	display: flex;

	strong {
		color: #fff;
		margin-left: 10px;
		font-size: 20px;
		font-weight: lighter;
	}
`;

export const Meet = styled.li`
	height: 62px;
	background-color: rgba(0, 0, 0, 0.1);
	border-radius: 5px;
	display: flex;
	margin-bottom: 10px;
	transform: scale(1);
	transition: all 0.25s ease-out;
	border-left: 0px solid transparent;
	cursor: pointer;
	opacity: ${props => (props.passed ? 0.6 : 1)};

	&:hover {
		background-color: rgba(0, 0, 0, 0.3);
		border-left: 5px solid ${settings.primaryColor};
		transform: scale(1.03);
	}

	a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0px 20px;
		width: 100%;

		strong {
			color: #fff;
			font-weight: bold;
		}

		time {
			margin-left: auto;
			color: rgba(255, 255, 255, 0.6);
		}

		svg {
			margin-left: 10px;
		}
	}
`;
