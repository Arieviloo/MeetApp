import styled from 'styled-components';

export const SelectImage = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	strong {
		font-size: 20px;
		color: rgba(255, 255, 255, 0.3);
		margin-top: 10px;
		transition: all 0.25s ease-out;
	}

	svg {
		fill: rgba(255, 255, 255, 0.3);
		transition: all 0.25s ease-out;
	}
`;

export const Container = styled.div`
	label {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		margin-bottom: 10px;
		width: 100%;
		height: 300px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;

		img {
			width: 100%;
			opacity: 1;
			transition: all 0.25s ease-out;
		}

		&:hover {
			img {
				opacity: 0.5;
			}

			.select {
				transform: translateY(0%);
			}
		}

		.select {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.3);
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-weight: bold;
			transform: translateY(100%);
			transition: all 0.25s ease-out;
		}

		input {
			display: none;
		}

		&:hover {
			${SelectImage} {
				strong {
					color: #fff;
				}

				svg {
					fill: #fff;
					transition: all 0.25s ease-out;
				}
			}
		}
	}
`;
