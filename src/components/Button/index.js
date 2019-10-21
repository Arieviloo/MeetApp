import styled, { css } from 'styled-components';
import { darken } from 'polished';
import settings from '../../styles/variables';

export const Button = styled.button`
	border: none;
	padding: 0px 10px;
	color: #fff;
	height: 42px;
	border-radius: 5px;
	font-weight: bold;
	display: flex;
	justify-content: space-between;
	align-items: center;
	transition: background-color 0.25s ease-in-out;

	${props =>
		props.primary &&
		css`
			background-color: ${settings.primaryColor};

			&:hover {
				background-color: ${darken(0.08, settings.primaryColor)};
			}
		`}

	${props =>
		props.secondary &&
		css`
			background-color: ${settings.secondaryColor};

			&:hover {
				background-color: ${darken(0.08, settings.secondaryColor)};
			}
		`}

	${props =>
		props.info &&
		css`
			background-color: ${settings.infoColor};

			&:hover {
				background-color: ${darken(0.08, settings.infoColor)};
			}
		`}

	svg {
		margin-right: 5px;

		${props =>
			props.loading &&
			css`
				animation: loading 1s infinite linear;

				@keyframes loading {
					from {
						transform: rotate(0deg);
					}
					to {
						transform: rotate(359deg);
					}
				}
			`}
	}
`;
