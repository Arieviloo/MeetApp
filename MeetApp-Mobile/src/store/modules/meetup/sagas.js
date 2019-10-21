import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import api from '~/services/api';
import {
	meetSubscriptionSuccess,
	meetSubscriptionFailure,
	meetCancelSuccess,
	meetCancelFailure,
} from './actions';

/**
 * Update meetup
 * @param {object} payload Data from meet
 */
export function* subscriptionMeet({ payload }) {
	try {
		yield call(api.post, `subscriptions`, {
			meetup_id: payload.id,
		});

		Alert.alert(
			'Yeeah!',
			'Sua inscrição foi efetuada com sucesso. Divirta-se!',
		);

		yield put(meetSubscriptionSuccess());
	} catch (error) {
		// Call Action (PUT)
		yield put(meetSubscriptionFailure());

		// Alert
		Alert.alert('Atenção!', error.response.data.error);
	}
}

/**
 * Cancel meetapp
 * @param {string} payload
 */
export function* cancelMeet({ payload }) {
	try {
		yield call(api.delete, `subscriptions/${payload.id}`);

		Alert.alert(
			'Atenção!',
			'Sua inscrição foi cancelada com sucesso. Que pena!',
		);

		yield put(meetCancelSuccess());
	} catch (error) {
		// Call Action (PUT)
		yield put(meetCancelFailure());

		// Alert
		Alert.alert('Atenção!', error.response.data.error);
	}
}

// Observers
export default all([
	takeLatest('@meet/SUBSCRIPTION_REQUEST', subscriptionMeet),
	takeLatest('@meet/CANCEL_REQUEST', cancelMeet),
]);
