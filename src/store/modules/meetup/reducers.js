import produce from 'immer';

const INITIAL_STATE = {
	loading: false,
	status: false,
};

export default function meet(state = INITIAL_STATE, action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@meet/SUBSCRIPTION_REQUEST':
				draft.loading = true;
				break;
			case '@meet/SUBSCRIPTION_SUCCESS':
				draft.loading = false;
				break;
			case '@meet/SUBSCRIPTION_FAILURE':
				draft.loading = false;
				break;
			case '@meet/CANCEL_REQUEST':
				draft.loading = true;
				draft.status = false;
				break;
			case '@meet/CANCEL_SUCCESS':
				draft.loading = false;
				draft.status = true;
				break;
			case '@meet/CANCEL_FAILURE':
				draft.loading = false;
				draft.status = false;
				break;
			default:
		}
	});
}
