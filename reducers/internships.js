import {internshipInputs} from '../utils/inputFields'

const initialState = {
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
		default:
			return state;
	}
};

export default internshipsReducer;
