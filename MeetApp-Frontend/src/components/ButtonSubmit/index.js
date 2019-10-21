import styled from 'styled-components';
import { darken } from 'polished';
import settings from '../../styles/variables';

export const ButtonSubmit = styled.button`
	background-color: ${settings.primaryColor};
	height: 50px;
	transition: all 0.25s ease-out;
	color: #fff;
	border: none;
	border-radius: 5px;
	font-size: 15px;
	font-weight: bold;
	width: 100%;

	&:hover {
		background-color: ${darken(0.08, settings.primaryColor)};
	}

	&:disabled {
		opacity: 0.4;
	}

	svg {
		animation: loading 1s infinite linear;

		@keyframes loading {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(359deg);
			}
		}
	}
`;
