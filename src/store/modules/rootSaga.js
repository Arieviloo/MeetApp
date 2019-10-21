import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import meet from './meetup/sagas';

export default function* rootSaga() {
	// Array
	return yield all([auth, user, meet]);
}
