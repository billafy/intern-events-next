import { internshipInputs } from "../utils/inputFields";

const initialState = {
	internship: {},
	internships: [],
	internshipInput: internshipInputs,
	inputError: "",
	stipendFilter: { max: 0, min: 0 },
	durationFilter: { max: 0, min: 0 },
	filters: {
		category: "All",
		stipend: 0,
		duration: 0,
		keyword: "",
	},
};

const internshipsReducer = (state = initialState, action) => {
	let newInternship, newInternships, internshipId, newInput;
	switch (action.type) {
		case "FLUSH_INPUT":
			return {
				...state,
				internshipInput: internshipInputs,
				inputError: "",
			};
		case "UPDATE_INPUT":
			newInput = { ...state.internshipInput };
			newInput[action.payload.name] = action.payload.value;
			return { ...state, internshipInput: newInput, inputError: "" };
		case "INPUT_ERROR":
			return { ...state, inputError: action.payload.error };
		case "SET_INTERNSHIPS":
			newInternships = action.payload.internships;
			return {
				...state,
				internships: newInternships,
			};
		case "SET_FILTERS":
			let minStipend = 10000000000000,
				maxStipend = -1,
				minDuration = 1000000000000,
				maxDuration = -1;
			state.internships.forEach((internship) => {
				minStipend = Math.min(minStipend, internship.stipend);
				maxStipend = Math.max(maxStipend, internship.stipend);
				minDuration = Math.min(minDuration, internship.duration);
				maxDuration = Math.max(maxDuration, internship.duration);
			});
			return {
				...state,
				stipendFilter: { max: maxStipend, min: minStipend },
				durationFilter: { max: maxDuration, min: minDuration },
				filters: {
					...state.filters,
					stipend: minStipend,
					duration: minDuration,
				},
			};
		case "SET_INTERNSHIP":
			return { ...state, internship: action.payload.internship };
		case "UPDATE_INTERNSHIPS":
			newInternship = action.payload.internship;
			newInternships = state.internships.map((internship) => {
				if (internship._id === newInternship._id) {
					return newInternship;
				}
				return internship;
			});
			return {
				...state,
				internships: newInternships,
				internship: newInternship,
			};
		case "UPDATE_FILTERS":
			let newFilters = state.filters;
			newFilters[action.payload.name] = action.payload.value;
			return { ...state, filters: { ...newFilters } };
		case "RESET_FILTERS":
			return {
				...state,
				stipendFilter: { max: 0, min: 0 },
				durationFilter: { max: 0, min: 0 },
				filters: {
					category: "All",
					stipend: 0,
					duration: 0,
					keyword: "",
				},
			};
		default:
			return state;
	}
};

export default internshipsReducer;
