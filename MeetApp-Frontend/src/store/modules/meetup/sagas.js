import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
	meetUpdateSuccess,
	meetUpdateFailure,
	meetCancelSuccess,
	meetCancelFailure,
	meetCreateSuccess,
	meetCreateFailure,
} from './actions';

/**
 * Create a meetup
 * @param {object} payload
 */
export function* createMeet({ payload }) {
	try {
		yield call(api.post, '/meetups', payload.meet);
		toast.success('Yeeah! Meetup criado com sucesso!');

		yield put(meetCreateSuccess({}));

		history.push('/dashboard');
	} catch (error) {
		// Call Action (PUT)
		yield put(meetCreateFailure());

		// Alert
		toast.error(error.response.data.error);
	}
}

/**
 * Update meetup
 * @param {object} payload Data from meet
 */
export function* updateMeet({ payload }) {
	try {
		const response = yield call(
			api.put,
			`meetups/${payload.id}`,
			payload.meet
		);

		toast.success('Yeeah! Meetup atualizado com sucesso!');

		yield put(meetUpdateSuccess(response));
		history.push('/dashboard');
	} catch (error) {
		// Call Action (PUT)
		yield put(meetUpdateFailure());

		// Alert
		toast.error(error.response.data.error);
	}
}

/**
 * Cancel meetapp
 * @param {string} payload
 */
export function* cancelMeet({ payload }) {
	try {
		yield call(api.delete, `meetups/${payload.id}`);

		toast.success('Yeeah! Meetup cancelado com sucesso!');

		history.push('/dashboard');

		yield put(meetCancelSuccess());
	} catch (error) {
		// Call Action (PUT)
		yield put(meetCancelFailure());

		// Alert
		toast.error(error.response.data.error);
	}
}

// Observers
export default all([
	takeLatest('@meet/UPDATE_REQUEST', updateMeet),
	takeLatest('@meet/CANCEL_REQUEST', cancelMeet),
	takeLatest('@meet/CREATE_REQUEST', createMeet),
]);
