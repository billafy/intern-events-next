import { combineReducers } from "redux";
import auth from "./auth";
import social from './social';

export default combineReducers({
	auth,
	social
});
