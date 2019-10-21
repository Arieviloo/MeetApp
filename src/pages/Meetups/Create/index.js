import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdChevronLeft } from 'react-icons/md';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Container } from './styles';
import { TitlePage } from '~/components/TitlePage';
import FormMeet from '~/components/FormMeet';

import { meetCreateRequest } from '~/store/modules/meetup/actions';

export default function Create() {
	const dispatch = useDispatch();
	const loadingSave = useSelector(state => state.meet.loading);
	const userId = useSelector(state => state.user.profile.id);

	const create = true;

	function handleSubmit(data) {
		data.date = format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
		data.user_id = userId;

		dispatch(meetCreateRequest(data));
	}

	return (
		<Container>
			<TitlePage>
				<h1>
					<Link to="/">
						<MdChevronLeft color="#FFF" size={28} />
					</Link>
					CRIAR NOVO MEETUP
				</h1>
			</TitlePage>

			<FormMeet
				onSubmit={handleSubmit}
				loading={loadingSave}
				create={create}
			/>
		</Container>
	);
}
