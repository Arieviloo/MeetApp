import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { FaSpinner } from 'react-icons/fa';
import { MdSave } from 'react-icons/md';
import * as Yup from 'yup';
import { Button } from '../Button';
import { Container } from './styles';

const schema = Yup.object().shape({
	name: Yup.string().required('Esse campo é obrigatório.'),
	email: Yup.string()
		.email('Formato de e-mail inválido. Ex: email@domain.com')
		.required('Esse campo é obrigatório.'),
	oldPassword: Yup.string(),
	password: Yup.string().when('oldPassword', (oldPassword, field) =>
		oldPassword
			? field
					.required('Esse campo é obrigatório.')
					.min(6, 'A senha precisa ter no mínimo 6 caracteres.')
			: field
	),
	confirmPassword: Yup.string().when('password', (password, field) =>
		password
			? field
					.required('Esse campo é obrigatório.')
					.oneOf([Yup.ref('password')], 'As senhas não conferem.')
			: field
	),
});

export default function FormUser({ profile, onSubmit, loading }) {
	return (
		<Container>
			<Form
				autoComplete="off"
				schema={schema}
				initialData={profile}
				onSubmit={onSubmit}
			>
				<Input name="name" placeholder="Digite seu nome completo" />
				<Input name="email" placeholder="Digite seu e-mail" />

				<hr />

				<Input
					name="oldPassword"
					type="password"
					placeholder="Digite sua senha atual"
				/>
				<Input
					name="password"
					type="password"
					placeholder="Digite sua nova senha"
				/>
				<Input
					name="confirmPassword"
					type="password"
					placeholder="Digite novamente sua senha"
				/>

				<Button info type="submit" loading={loading ? 1 : 0}>
					{loading ? (
						<FaSpinner color="#FFF" size={16} />
					) : (
						<MdSave color="#FFf" size={16} />
					)}
					SALVAR
				</Button>
			</Form>
		</Container>
	);
}

FormUser.propTypes = {
	profile: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
	}),
	onSubmit: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

FormUser.defaultProps = {
	profile: {},
};
