import styled from 'styled-components';
import settings from '../../styles/variables';

export const Spinner = styled.div`
	margin: 100px auto;
	width: 50px;
	height: 40px;
	text-align: center;
	font-size: 10px;
	opacity: 0.4;

	> div {
		background-color: ${settings.primaryColor};
		height: 100%;
		width: 6px;
		display: inline-block;
		margin-right: 4px;
		animation: sk-stretchdelay 1.2s infinite ease-in-out;
	}

	.rect2 {
		animation-delay: -1.1s;
	}

	.rect3 {
		animation-delay: -1s;
	}

	.rect4 {
		animation-delay: -0.9s;
	}

	.rect5 {
		animation-delay: -0.8s;
	}

	@keyframes sk-stretchdelay {
		0%,
		40%,
		100% {
			transform: scaleY(0.4);
			-webkit-transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1);
			-webkit-transform: scaleY(1);
		}
	}
`;
