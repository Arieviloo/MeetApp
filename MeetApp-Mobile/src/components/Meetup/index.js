import React, { useMemo } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
	Container,
	Title,
	Address,
	AddressText,
	Owner,
	OwnerText,
	SubmitSubscription,
	InfoMeet,
	Date,
	DateText,
	LinkSubscription,
	ImageMeet,
	Passed,
	PassedText,
	Details,
	DetailsText,
} from './styles';

export default function Meetup({
	data,
	onActionMeetup,
	onViewDetail,
	meetid,
	loading,
	textButton,
}) {
	const dateFormatted = useMemo(
		() =>
			format(parseISO(data.date), "d 'de' MMMM', às 'H':'mm'hs'", {
				locale: pt,
			}),
		[data.date],
	);

	return (
		<Container>
			<ImageMeet source={{ uri: data.files.url }} />

			<InfoMeet>
				<Title>{data.title}</Title>

				<Date>
					<Icon name="event" size={15} color="#999" />
					<DateText>{dateFormatted}</DateText>
				</Date>
				<Address>
					<Icon name="place" size={15} color="#999" />
					<AddressText>{data.localization}</AddressText>
				</Address>
				<Owner>
					<Icon name="person" size={15} color="#999" />
					<OwnerText>Organizador: {data.users.name}</OwnerText>
				</Owner>

				<Details onPress={() => onViewDetail(data.description)}>
					<DetailsText>Detalhes</DetailsText>
				</Details>

				{data.passed ? (
					<Passed>
						<PassedText>Meetup Realizado</PassedText>
					</Passed>
				) : (
					<SubmitSubscription onPress={() => onActionMeetup(data.id)}>
						{loading && meetid === data.id ? (
							<ActivityIndicator size="small" color="#FFF" />
						) : (
							<LinkSubscription>{textButton}</LinkSubscription>
						)}
					</SubmitSubscription>
				)}
			</InfoMeet>
		</Container>
	);
}

Meetup.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.number,
		passed: PropTypes.bool,
		title: PropTypes.string,
		date: PropTypes.string,
		localization: PropTypes.string,
		description: PropTypes.string,
		users: PropTypes.shape({
			name: PropTypes.string,
		}).isRequired,
		files: PropTypes.shape({
			url: PropTypes.string,
		}).isRequired,
	}).isRequired,
	onActionMeetup: PropTypes.func.isRequired,
	onViewDetail: PropTypes.func.isRequired,
	meetid: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	textButton: PropTypes.string.isRequired,
};
