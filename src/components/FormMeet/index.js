import React from 'react';
import { PropTypes } from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdSave } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';
import * as Yup from 'yup';
import { Container } from './styles';
import { Button } from '../Button';
import CoverInput from '../CoverInput';
import DatePicker from '../DatePicker';

const schema = Yup.object().shape({
	title: Yup.string().required('Esse campo é obrigatório.'),
	file_id: Yup.string().required('Esse campo é obrigatório.'),
	localization: Yup.string().required('Esse campo é obrigatório.'),
	description: Yup.string().required('Esse campo é obrigatório.'),
	date: Yup.string().required('Esse campo é obrigatório.'),
});

export default function FormMeet({ meet, onSubmit, loading, create }) {
	return (
		<Container>
			<Form
				initialData={meet}
				schema={schema}
				onSubmit={onSubmit}
				autoComplete="off"
			>
				<CoverInput name="file_id" />

				<Input name="title" placeholder="Título do Meetup" />

				<Input
					multiline
					name="description"
					placeholder="Descrição do Meetup"
				/>

				<DatePicker name="date" />

				<Input
					name="localization"
					placeholder="Localização do Meetup"
				/>

				<Button info type="submit" loading={loading ? 1 : 0}>
					{loading ? (
						<FaSpinner color="#FFF" size={16} />
					) : (
						<MdSave color="#FFf" size={16} />
					)}
					{create ? 'CRIAR MEETUP' : 'SALVAR MEETUP'}
				</Button>
			</Form>
		</Container>
	);
}

FormMeet.propTypes = {
	meet: PropTypes.shape({
		id: PropTypes.number,
		title: PropTypes.string,
		localization: PropTypes.string,
		date: PropTypes.instanceOf(Date),
	}),
	onSubmit: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	create: PropTypes.bool.isRequired,
};

FormMeet.defaultProps = {
	meet: {},
};
