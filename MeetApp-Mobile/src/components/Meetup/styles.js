import styled from 'styled-components/native';
import settings from '~/styles/variables';

export const Container = styled.View`
	background-color: #fff;
	display: flex;
	margin-bottom: 20px;
`;

export const ImageMeet = styled.Image`
	width: 100%;
	height: 150px;
`;

export const InfoMeet = styled.View`
	padding: 15px;
`;

export const Title = styled.Text`
	font-size: 18px;
	font-weight: bold;
`;

export const Date = styled.View`
	align-items: center;
	flex-direction: row;
	margin-top: 10px;
`;

export const DateText = styled.Text`
	font-size: 15px;
	color: #999999;
	margin-left: 5px;
`;

export const Address = styled.View`
	align-items: center;
	flex-direction: row;
	margin-top: 5px;
`;
export const AddressText = styled.Text`
	font-size: 15px;
	color: #999999;
	margin-left: 5px;
`;

export const Owner = styled.View`
	align-items: center;
	flex-direction: row;
	margin-top: 5px;
`;

export const OwnerText = styled.Text`
	font-size: 15px;
	color: #999999;
	margin-left: 5px;
`;

export const Details = styled.TouchableOpacity`
	background-color: ${settings.buttonDetailColor};
	color: #fff;
	justify-content: center;
	align-items: center;
	height: 40px;
	border-radius: 4px;
	margin-top: 20px;
`;

export const DetailsText = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;

export const SubmitSubscription = styled.TouchableOpacity`
	background-color: ${settings.primaryColor};
	color: #fff;
	justify-content: center;
	align-items: center;
	height: 40px;
	border-radius: 4px;
	margin-top: 5px;
`;

export const LinkSubscription = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;

export const Passed = styled.View`
	background-color: ${settings.secondaryColor};
	justify-content: center;
	align-items: center;
	height: 40px;
	border-radius: 4px;
	margin-top: 5px;
`;

export const PassedText = styled.Text`
	color: #fff;
	font-weight: bold;
	font-size: 16px;
`;
