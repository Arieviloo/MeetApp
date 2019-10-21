import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import { isBefore, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import ModalDetail from '~/components/ModalDetail';

import { meetCancelRequest } from '~/store/modules/meetup/actions';

import {
	Container,
	ListMeetups,
	NoMeet,
	NoMeetText,
	LoadingMeet,
} from './styles';

function Subscriptions({ isFocused }) {
	const dispatch = useDispatch();
	const [meetups, setMeetups] = useState([]);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [id, setId] = useState(0);

	const cancelLoading = useSelector(state => state.meet.loading);
	const statusCancel = useSelector(state => state.meet.status);

	const [modalVisible, setModalVisible] = useState(false);
	const [descriptionMeet, setDescriptionMeet] = useState('');

	/**
	 * Get meetups than user logged can subscription
	 */

	async function loadMeetups() {
		try {
			setLoading(true);

			const response = await api.get('subscriptions');

			// Load all meetups than user logged not is owner
			const data = response.data.map(meet => {
				return {
					...meet,
					passed: isBefore(parseISO(meet.date), new Date()),
				};
			});

			setMeetups(data);
			setLoading(false);
			setRefreshing(false);
		} catch (err) {
			setMeetups([]);
			setLoading(false);
			setRefreshing(false);
		}
	}

	/**
	 * Focus in tab
	 */
	useEffect(() => {
		if (isFocused) {
			loadMeetups();
		}
	}, [isFocused]);

	useEffect(() => {
		console.tron.log(statusCancel);
		if (statusCancel) {
			setMeetups(meetups.filter(item => item.id !== id));
		}
	}, [statusCancel]); //eslint-disable-line

	// On refreshing from meetups
	function refreshLoadMeetups() {
		setRefreshing(true);
		loadMeetups();
	}

	// Request Subscription User to Cancel
	function handleCancelSubscription(meetid) {
		setId(meetid);
		dispatch(meetCancelRequest(meetid));
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

				{meetups.length > 0 ? (
					<ListMeetups
						data={meetups}
						refreshing={refreshing}
						onRefresh={refreshLoadMeetups}
						keyExtractor={meet => String(meet.id)}
						renderItem={({ item }) => (
							<Meetup
								data={item}
								textButton="Cancelar Inscrição"
								loading={cancelLoading}
								meetid={id}
								onActionMeetup={() =>
									handleCancelSubscription(item.id)
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
								Você ainda não se inscreveu em um meetup.
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
	return <Icon name="local-offer" size={20} color={tintColor} />;
}

Subscriptions.propTypes = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func,
	}).isRequired,
	isFocused: PropTypes.bool.isRequired,
};

IconTab.propTypes = {
	tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
	tabBarLabel: 'Inscrições',
	tabBarIcon: IconTab,
};

export default withNavigationFocus(Subscriptions);
