import { combineReducers } from "redux";
import auth from "./auth";
import social from "./social";
import internships from "./internships";
import { initialState } from "../store";
import { defaultInputs, internshipInputs } from "../utils/inputFields";

const appReducer = combineReducers({
	auth,
	social,
	internships,
});

const rootReducer = (state, action) => {
	if (action.type === "LOGOUT") {
		if (state.socket) state.socket.disconnect();
		state = {
			auth: {
				...state.auth,
				accountInput: defaultInputs,
				inputError: "",
				loading: false,
				isLoggedIn: false,
				account: {},
				socket: null,
			},
			social: {
				posts: [],
				chats: [],
				selectedChat: {},
				text: "",
			},
			internships: {
				internships: [],
				internshipInput: internshipInputs,
				internship: {},
				inputError: "",
				stipendFilter: { max: 0, min: 0 },
				durationFilter: { max: 0, min: 0 },
				filters: {
					category: "All",
					stipend: 0,
					duration: 0,
					keyword: "",
				},
			},
		};
	}
	return appReducer(state, action);
};

export default rootReducer;
