import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdChevronLeft } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { meetUpdateRequest } from '~/store/modules/meetup/actions';
import Loading from '~/components/Loading';
import { TitlePage } from '~/components/TitlePage';
import FormMeet from '~/components/FormMeet';
import { Container } from './styles';

import api from '~/services/api';

export default function Edit({ match }) {
	const dispatch = useDispatch();
	const loadingSave = useSelector(state => state.meet.loading);
	const userId = useSelector(state => state.user.profile.id);

	const [meetup, setMeetup] = useState({});
	const [loading, setLoading] = useState(false);
	const { id } = match.params;

	const create = false;

	/**
	 * Show meetup details
	 */
	useEffect(() => {
		const loadDetailMeetup = async () => {
			setLoading(true);

			const response = await api.get(`/meetups/${id}`);
			const meet = response.data;

			meet.date = parseISO(meet.date);

			setMeetup(meet);
			setLoading(false);
		};

		loadDetailMeetup();
	}, [id]);

	function handleSubmit(data) {
		data.date = format(new Date(data.date), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
		data.user_id = userId;

		dispatch(meetUpdateRequest(data, id));
	}

	return (
		<Container>
			<TitlePage>
				<h1>
					<Link to={`/meetups/${id}`}>
						<MdChevronLeft color="#FFF" size={28} />
					</Link>
					{meetup.title}
				</h1>
			</TitlePage>

			{loading ? (
				<Loading />
			) : (
				<FormMeet
					meet={meetup}
					onSubmit={handleSubmit}
					loading={loadingSave}
					create={create}
				/>
			)}
		</Container>
	);
}

Edit.propTypes = {
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}),
	}).isRequired,
};
