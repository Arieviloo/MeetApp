import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import api from '~/services/api';
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

		Alert.alert('Yeeah!', 'Conta criada com sucesso! Faça o login.');

		yield put(createUserSuccess());
	} catch (error) {
		Alert.alert(
			'Atenção!',
			'Houve um problema ao criar o usuário. Tente novamente mais tarde.',
		);

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

		Alert.alert('Yeeah!', 'Conta atualizada com sucesso!');

		yield put(updateUserSuccess(response.data));
	} catch (error) {
		Alert.alert(
			'Atenção!',
			'Houve um problema ao atualizar o usuário. Tente novamente mais tarde.',
		);

		yield put(updateUserFailure());
	}
}

// Observers
export default all([
	takeLatest('@user/CREATE_REQUEST', createUser),
	takeLatest('@user/UPDATE_REQUEST', updateUser),
]);
