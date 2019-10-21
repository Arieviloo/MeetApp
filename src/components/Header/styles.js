import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';
import settings from '../../styles/variables';

export const Container = styled.header`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	transition: all 0.25s ease-in;
	z-index: 1;

	${props =>
		props.top > 75 &&
		css`
			background-color: rgba(0, 0, 0, 1);
		`}
`;

export const Wrapper = styled.div`
	width: 90%;
	height: 92px;
	max-width: 940px;
	margin: auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: all 0.25s ease-in;

	${props =>
		props.top > 75 &&
		css`
			height: 60px;
		`}

	img {
		width: 32px;
		transform: scale(1);
		transition: all 0.25s ease-in-out;

		&:hover {
			transform: scale(1.2);
		}
	}
`;

export const Profile = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	div {
		text-align: right;
		display: flex;
		flex-direction: column;

		strong {
			color: #fff;
			font-size: 14px;
			font-weight: 700;
		}

		a {
			color: #999;
			font-size: 12px;
			font-weight: 700;
			margin-top: 2px;

			&:hover {
				color: ${lighten(0.05, '#999')};
			}
		}
	}

	button {
		margin-left: 25px;
		background-color: ${settings.primaryColor};
		border: none;
		height: 42px;
		padding: 0px 20px;
		border-radius: 4px;
		color: #fff;
		font-weight: bold;
		transition: all 0.25s ease-in;

		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			margin-right: 5px;
		}

		&:hover {
			background-color: ${darken(0.08, settings.primaryColor)};
		}
	}
`;
