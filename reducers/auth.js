import { defaultInputs } from "../utils/inputFields";

const initialState = {
	accountInput: defaultInputs,
	inputError: "",
	loading: true,
	isLoggedIn: false,
	account: {},
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
				loading: false,
				isLoggedIn: true,
				account: action.payload.account,
			};
		case "UPDATE_INPUT":
			return { ...state, accountInput: state.accountInput };
		default:
			return state;
	}
};

export default authReducer;
