// Actions Create
export function meetCreateRequest(meet) {
	return {
		type: '@meet/CREATE_REQUEST',
		payload: { meet },
	};
}

export function meetCreateSuccess() {
	return {
		type: '@meet/CREATE_SUCCESS',
	};
}

export function meetCreateFailure() {
	return {
		type: '@meet/CREATE_FAILURE',
	};
}

// Actions Update
export function meetUpdateRequest(meet, id) {
	return {
		type: '@meet/UPDATE_REQUEST',
		payload: { meet, id },
	};
}

export function meetUpdateSuccess() {
	return {
		type: '@meet/UPDATE_SUCCESS',
	};
}

export function meetUpdateFailure() {
	return {
		type: '@meet/UPDATE_FAILURE',
	};
}

// Actions Cancel
export function meetCancelRequest(id) {
	return {
		type: '@meet/CANCEL_REQUEST',
		payload: { id },
	};
}

export function meetCancelSuccess() {
	return {
		type: '@meet/CANCEL_SUCCESS',
	};
}

export function meetCancelFailure() {
	return {
		type: '@meet/CANCEL_FAILURE',
	};
}
