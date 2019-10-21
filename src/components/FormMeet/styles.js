import styled from 'styled-components';
import settings from '../../styles/variables';

export const Container = styled.div`
	form {
		display: flex;
		flex-direction: column;
		margin: 20px 0px;
		transition: all 0.3s ease-in;
		animation: upForm 0.7s forwards;
		opacity: 0.5;

		@keyframes upForm {
			from {
				margin-top: 20px;
				opacity: 0;
			}
			to {
				margin-top: 30px;
				opacity: 1;
			}
		}

		input {
			background-color: rgba(0, 0, 0, 0.1);
			border-left: 0px solid rgba(0, 0, 0, 0.1);
			border: none;
			border-radius: 5px;
			padding: 0px 15px;
			color: #fff;
			margin-bottom: 10px;
			height: 50px;
			font-size: 15px;
			width: 100%;
			transition: all 0.25s ease-in;

			&:focus {
				border-left: 2px solid ${settings.primaryColor};
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.5);
			}
		}

		textarea {
			background-color: rgba(0, 0, 0, 0.1);
			border-left: 0px solid rgba(0, 0, 0, 0.1);
			border: none;
			border-radius: 5px;
			padding: 15px;
			color: #fff;
			margin-bottom: 10px;
			font-size: 15px;
			font-family: ${settings.fontRoboto};
			height: 200px;
			transition: all 0.25s ease-in;
			resize: none;

			&:focus {
				border-left: 2px solid ${settings.primaryColor};
			}

			&::placeholder {
				color: rgba(255, 255, 255, 0.5);
			}
		}

		button {
			align-self: flex-end;
		}

		span {
			text-align: left;
			color: #fff;
			margin: 0px 0px 10px;
		}

		a {
			color: #fff;
			margin-top: 15px;
			opacity: 1;
			transition: all 0.25s ease-in;

			&:hover {
				opacity: 0.8;
			}
		}
	}
`;
