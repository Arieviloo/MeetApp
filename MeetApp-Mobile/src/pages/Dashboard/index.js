import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	ActivityIndicator,
	ToastAndroid,
	TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { isBefore, parseISO, subDays, addDays, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import { meetSubscriptionRequest } from '~/store/modules/meetup/actions';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import ModalDetail from '~/components/ModalDetail';

import {
	Container,
	ListMeetups,
	NoMeet,
	NoMeetText,
	DateSelector,
	DateText,
	LoadingMeet,
} from './styles';

export default function Dashboard() {
	const dispatch = useDispatch();

	const [meetups, setMeetups] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [date, setDate] = useState(new Date());
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(0);

	const [modalVisible, setModalVisible] = useState(false);
	const [descriptionMeet, setDescriptionMeet] = useState('');

	const subscriptionLoading = useSelector(state => state.meet.loading);

	const dateFormatted = useMemo(
		() => format(date, "d 'de' MMMM 'de' yyyy", { locale: pt }),
		[date],
	);

	/**
	 * Get meetups than user logged can subscription
	 */
	useEffect(() => {
		// Load all meetups than user logged not is owner
		async function loadMeetups() {
			try {
				setLoading(true);

				// OnRefresh Set 0 in Page to Effect
				if (page === 0) setPage(1);

				const response = await api.get('meetups', {
					params: {
						date,
						page,
					},
				});

				const data = response.data.map(meet => {
					return {
						...meet,
						passed: isBefore(parseISO(meet.date), new Date()),
					};
				});

				if (page === 1) {
					setMeetups(data);
				} else {
					setMeetups([...meetups, ...data]);
				}

				setLoading(false);
				setRefreshing(false);
			} catch (err) {
				if (page === 1) setMeetups([]);
				else {
					ToastAndroid.showWithGravityAndOffset(
						'Não existem mais meetups à serem mostrados.',
						ToastAndroid.LONG,
						ToastAndroid.BOTTOM,
						25,
						50,
					);
				}

				setLoading(false);
				setRefreshing(false);
			}
		}

		loadMeetups();
	}, [date, page]); // eslint-disable-line

	function handlePrevDay() {
		setMeetups([]);
		setPage(1);
		setDate(subDays(date, 1));
	}

	function handleNextDay() {
		setMeetups([]);
		setPage(1);
		setDate(addDays(date, 1));
	}

	// On refreshing from meetups
	function refreshLoadMeetups() {
		setRefreshing(true);
		setPage(0);
	}

	// On change page
	function handleChangePage() {
		if (meetups.length >= 10) setPage(page + 1);
	}

	// Request Subscription User
	function handleSubscription(meetid) {
		setId(meetid);
		dispatch(meetSubscriptionRequest(meetid));
	}

	// View Modal
	function handleViewModal(description) {
		setDescriptionMeet(description);
		setModalVisible(true);
	}

	return (
		<Background>
			<Container>
				<Header />

				<DateSelector>
					<TouchableOpacity onPress={handlePrevDay}>
						<Icon name="chevron-left" size={38} color="#FFF" />
					</TouchableOpacity>

					<DateText>{dateFormatted}</DateText>

					<TouchableOpacity onPress={handleNextDay}>
						<Icon name="chevron-right" size={38} color="#FFF" />
					</TouchableOpacity>
				</DateSelector>

				{meetups.length > 0 ? (
					<ListMeetups
						data={meetups}
						refreshing={refreshing}
						onRefresh={refreshLoadMeetups}
						onEndReached={handleChangePage}
						onEndReachedThreshold={0.5}
						keyExtractor={meet => String(meet.id)}
						renderItem={({ item }) => (
							<Meetup
								data={item}
								loading={subscriptionLoading}
								meetid={id}
								textButton="Realizar Inscrição"
								onActionMeetup={() =>
									handleSubscription(item.id)
								}
								onViewDetail={() =>
									handleViewModal(item.description)
								}
							/>
						)}
					/>
				) : (
					!loading && (
						<NoMeet>
							<Icon name="event-busy" size={30} color="#999" />
							<NoMeetText>
								Não existe nenhum meetup nesse dia.
							</NoMeetText>
						</NoMeet>
					)
				)}

				{loading && (
					<LoadingMeet>
						<ActivityIndicator size="small" color="#FFF" />
					</LoadingMeet>
				)}
			</Container>

			<ModalDetail
				onClose={() => setModalVisible(false)}
				visible={modalVisible}
				description={descriptionMeet}
			/>
		</Background>
	);
}

function IconTab({ tintColor }) {
	return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

Dashboard.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
};

IconTab.propTypes = {
	tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
	tabBarLabel: 'Meetups',
	tabBarIcon: IconTab,
};
