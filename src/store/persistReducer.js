import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default reducers => {
	const persistedReducer = persistReducer(
		{
			key: 'meetappweb',
			storage,
			whitelist: ['auth', 'user'], // Name Reducers
		},
		reducers
	);

	return persistedReducer;
};
