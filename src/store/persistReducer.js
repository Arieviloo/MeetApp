import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default reducers => {
	const persistedReducer = persistReducer(
		{
			key: 'meetappweb',
			storage: AsyncStorage,
			whitelist: ['auth', 'user'], // Name Reducers
		},
		reducers,
	);

	return persistedReducer;
};
