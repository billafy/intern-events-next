import { defaultInputs } from "../utils/inputFields";

const initialState = {
	accountInput: defaultInputs,
	inputError: "",
	loading: true,
	isLoggedIn: false,
	account: {},
	width: 0,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOAD":
			return { ...state, loading: true };
		case "STOP_LOAD":
			return { ...state, loading: false };
		case "INPUT_ERROR":
			return {
				...state,
				loading: false,
				inputError: action.payload.inputError,
			};
		case "LOGIN":
			return {
				...state,
				isLoggedIn: true,
				account: action.payload.account,
			};
		case "LOGOUT":
			return {
				...state,
				isLoggedIn: false,
				account: {},
			};
		case "UPDATE_INPUT":
			return { ...state, accountInput: state.accountInput };
		case "SET_WIDTH":
			return { ...state, width: action.payload.newWidth };
		case "PROFILE_PICTURE":
			return {
				...state,
				account: {
					...state.account,
					profilePicture: action.payload.profilePicture,
				},
			};
		case "RESUME":
			return {
				...state,
				account: {
					...state.account,
					details: {
						...state.account.details,
						resume: action.payload.resume,
					},
				},
			};
		default:
			return state;
	}
};

export default authReducer;
