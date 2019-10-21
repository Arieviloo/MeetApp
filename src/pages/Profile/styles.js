import { Platform } from 'react-native';
import styled from 'styled-components/native';
import settings from '~/styles/variables';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
	enabled: Platform.OS === 'ios',
	behavior: 'padding',
})`
	flex: 1;
	justify-content: center;
	align-items: stretch;
	display: flex;
`;

export const Form = styled.ScrollView.attrs({
	showsVerticalScrollIndicator: false,
	contentContainerStyle: {
		padding: 30,
	},
})`
	align-self: stretch;
`;

export const FormInput = styled(Input)`
	margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
	margin-top: 5px;
`;

export const SignLink = styled.TouchableOpacity`
	margin-top: 20px;
`;

export const SignLinkText = styled.Text`
	color: #eee;
	font-weight: bold;
	font-size: 16px;
`;

export const Separator = styled.View`
	height: 1px;
	background: rgba(255, 255, 255, 0.2);
	margin: 20px 30px;
`;

export const Logout = styled(Button)`
	margin-top: 10px;
	background: ${settings.secondaryColor};
`;

export const ErrorField = styled.Text`
	color: #fff;
	margin-top: -5px;
`;
