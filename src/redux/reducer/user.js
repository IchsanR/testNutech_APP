const initialState = {
	data: [],
	isLoading: true,
	isError: true,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		// register
		case "REGISTER_USER_PENDING":
			return { ...state, isLoading: true };
		case "REGISTER_USER_FULFILLED":
			return { ...state, data: action.payload.data, isLoading: false };
		case "REGISTER_USER_REJECTED":
			return { ...state, isLoading: false, isError: true };
		default:
			return state;
	}
}
