// Create User

export function createUserRequest(name, email, password) {
	return {
		type: '@user/CREATE_REQUEST',
		payload: {
			name,
			email,
			password,
		},
	};
}

export function createUserSuccess() {
	return {
		type: '@user/CREATE_SUCCESS',
	};
}

export function createUserFailure() {
	return {
		type: '@user/CREATE_FAILURE',
	};
}

// Update User

export function updateUserRequest(data) {
	return {
		type: '@user/UPDATE_REQUEST',
		payload: { data },
	};
}

export function updateUserSuccess(data) {
	return {
		type: '@user/UPDATE_SUCCESS',
		payload: { data },
	};
}

export function updateUserFailure() {
	return {
		type: '@user/UPDATE_FAILURE',
	};
}
