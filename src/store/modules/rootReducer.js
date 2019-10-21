import { combineReducers } from 'redux';

import auth from './auth/reducers';
import user from './user/reducers';
import meet from './meetup/reducers';

export default combineReducers({ auth, user, meet });
