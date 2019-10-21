import styled from 'styled-components/native';
import settings from '~/styles/variables';

export const TextDescription = styled.Text`
	font-size: 17px;
	padding: 20px;
	text-align: center;
`;

export const ButtonClose = styled.TouchableOpacity`
	background-color: ${settings.primaryColor};
	color: #fff;
	justify-content: center;
	align-items: center;
	height: 40px;
	border-radius: 4px;
	margin-top: 5px;
	width: 100px;
`;

export const ButtonCloseText = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;

export const WrapperModal = styled.View`
	align-items: center;
	justify-content: center;
	flex: 1;
	display: flex;
`;
