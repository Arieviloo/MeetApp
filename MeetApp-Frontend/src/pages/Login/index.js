import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '~/store/modules/auth/actions';

import { ButtonSubmit } from '~/components/ButtonSubmit';
import Logo from '~/assets/images/meetapp-logo.svg';

export default function Login() {
	const dispatch = useDispatch(); // Actions
	const loading = useSelector(state => state.auth.loading);

	const schema = Yup.object().shape({
		email: Yup.string()
			.required('O campo e-mail é obrigatório.')
			.email('Digite um e-mail válido.'),
		password: Yup.string().required('O campo senha é obrigatório.'),
	});

	/**
	 * Authentication user in platform
	 * @param {string} email
	 * @param {string} password
	 */
	function handleSubmitForm({ email, password }) {
		dispatch(loginRequest(email, password));
	}

	return (
		<>
			<img src={Logo} alt="MeetApp - Networking Infinite" />

			<Form
				autoComplete="off"
				onSubmit={handleSubmitForm}
				schema={schema}
			>
				<Input
					name="email"
					type="email"
					placeholder="Digite seu e-mail"
				/>
				<Input
					name="password"
					type="password"
					placeholder="Digite sua senha"
				/>

				<ButtonSubmit type="submit" disabled={loading}>
					{loading ? <FaSpinner size={18} color="#FFF" /> : 'ACESSAR'}
				</ButtonSubmit>

				<Link to="/register">CRIAR CONTA GRATUITA</Link>
			</Form>
		</>
	);
}
