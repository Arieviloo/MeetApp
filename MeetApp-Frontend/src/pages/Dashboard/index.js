import React, { useEffect, useState, useMemo } from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
	MdAddCircleOutline,
	MdChevronRight,
	MdInfoOutline,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container, ListMeet, Meet, NotMeet } from './styles';
import { TitlePage } from '~/components/TitlePage';
import { Button } from '~/components/Button';
import Loading from '~/components/Loading';

import api from '~/services/api';

export default function Dashboard() {
	const [meetups, setMeetups] = useState([]);
	const [loading, setLoading] = useState(false);

	const meetAmount = useMemo(() => meetups.length, [meetups]);

	/**
	 * Get meetups from user logged is owner
	 */
	useEffect(() => {
		const loadMeetups = async () => {
			setLoading(true);
			const response = await api.get('meetups/owner');

			try {
				const data = response.data.map(meet => {
					return {
						...meet,
						date: format(
							parseISO(meet.date),
							"d 'de' MMMM', às 'H'hs'",
							{ locale: pt }
						),
						passed: isBefore(parseISO(meet.date), new Date()),
					};
				});

				setMeetups(data);
			} catch (error) {
				setMeetups([]);
			} finally {
				setLoading(false);
			}
		};

		loadMeetups();
	}, []);

	return (
		<Container>
			<TitlePage>
				<h1>MEUS MEETUPS</h1>
				<Link to="/meetups/create">
					<Button type="button" secondary>
						<MdAddCircleOutline color="#FFf" size={16} />
						NOVO MEETUP
					</Button>
				</Link>
			</TitlePage>

			{loading ? (
				<Loading />
			) : (
				<ListMeet>
					{!meetAmount ? (
						<NotMeet>
							<MdInfoOutline size={36} color="#FFF" />
							<strong>Você ainda não criou nenhum meetup!</strong>
						</NotMeet>
					) : (
						meetups.map(meet => (
							<Meet key={String(meet.id)} passed={meet.passed}>
								<Link to={`/meetups/${meet.id}`}>
									<strong>{meet.title}</strong>
									<time>{meet.date}</time>
									<MdChevronRight color="#FFF" size={20} />
								</Link>
							</Meet>
						))
					)}
				</ListMeet>
			)}
		</Container>
	);
}
