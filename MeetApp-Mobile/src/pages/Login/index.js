import React, { useState, useRef } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import logo from '~/assets/images/meetapp-logo.png';

import Background from '~/components/Background';

import { loginRequest } from '~/store/modules/auth/actions';

import {
	Container,
	Form,
	FormInput,
	SubmitButton,
	SignLink,
	SignLinkText,
} from './styles';

export default function Login({ navigation }) {
	const dispatch = useDispatch();
	const loading = useSelector(state => state.auth.loading);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const passwordRef = useRef();

	/**
	 * Submit form to login user
	 */
	function handleSubmitLogin() {
		dispatch(loginRequest(email, password));
	}

	return (
		<Background>
			<Container>
				<Image source={logo} />

				<Form>
					<FormInput
						icon="mail-outline"
						placeholder="Digite seu e-mail"
						keyboardType="email-address"
						autoCorrect={false}
						autoCapitalize="none"
						returnKeyType="next"
						value={email}
						onChangeText={setEmail}
						onSubmitEditing={() => passwordRef.current.focus()}
					/>

					<FormInput
						icon="lock-outline"
						placeholder="Digite sua senha"
						returnKeyType="send"
						value={password}
						onChangeText={setPassword}
						ref={passwordRef}
						onSubmitEditing={handleSubmitLogin}
						secureTextEntry
					/>

					<SubmitButton loading={loading} onPress={handleSubmitLogin}>
						ENTRAR
					</SubmitButton>
				</Form>

				<SignLink onPress={() => navigation.navigate('Register')}>
					<SignLinkText>CRIAR CONTA GRATUITA</SignLinkText>
				</SignLink>
			</Container>
		</Background>
	);
}

Login.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};
