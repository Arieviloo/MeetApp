import { takeLatest, call, all, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import {
	createUserSuccess,
	createUserFailure,
	updateUserSuccess,
	updateUserFailure,
} from './actions';

/**
 * Create user in platform
 * @param {string} payload Data from user
 */
export function* createUser({ payload }) {
	try {
		const { name, email, password } = payload;

		yield call(api.post, 'users', {
			name,
			email,
			password,
		});

		toast.success('Yeeah! Conta criada com sucesso! Faça o login.');

		yield put(createUserSuccess());

		history.push('/');
	} catch (err) {
		toast.error(err.response.data.error);

		yield put(createUserFailure());
	}
}

/**
 * Update user in platform
 * @param {string} payload Object from data user
 */
export function* updateUser({ payload }) {
	try {
		const response = yield call(api.put, 'users', {
			...payload.data,
		});

		toast.success('Yeeah! Conta atualizada com sucesso!');

		yield put(updateUserSuccess(response.data));
	} catch (err) {
		toast.error(err.response.data.error);

		yield put(updateUserFailure());
	}
}

// Observers
export default all([
	takeLatest('@user/CREATE_REQUEST', createUser),
	takeLatest('@user/UPDATE_REQUEST', updateUser),
]);
