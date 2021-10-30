import {internshipInputs} from '../utils/inputFields'

const initialState = {
	internship: {},
	internships: [],
	internshipInput: internshipInputs,
	inputError: '',
};

const internshipsReducer = (state = initialState, action) => {
	let newInternship, newInternships, internshipId, newInput;
	switch (action.type) {
		case 'FLUSH_INPUT' : 
			return {...state, internshipInput: internshipInputs, inputError: ''}
		case "UPDATE_INPUT": 
			newInput = {...state.internshipInput}
			newInput[action.payload.name] = action.payload.value
			return {...state, internshipInput: newInput, inputError: ''};
		case 'INPUT_ERROR' : 
			return {...state, inputError: action.payload.error}
		case 'SET_INTERNSHIPS' : 
			return {...state, internships: action.payload.internships}
		case 'SET_INTERNSHIP' :
			return {...state, internship: action.payload.internship}
		case 'UPDATE_INTERNSHIPS' : 
			newInternship = action.payload.internship
			newInternships = state.internships.map(internship => {
				if(internship._id === newInternship._id) {
					return newInternship
				}
				return internship
			})
			return {...state, internships: newInternships, internship: newInternship}
		default:
			return state;
	}
};

export default internshipsReducer;
