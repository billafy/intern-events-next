import { combineReducers } from "redux";
import auth from "./auth";
import social from "./social";
import internships from './internships'

export default combineReducers({
	auth,
	social,
	internships,
});
