import { fromJS } from 'immutable';

const formInitialState = fromJS({
  formData: '',
});

function handleChange(state, action){
	state = state.set('formData', action.formData);
	return state
}

export function formReducer(state = formInitialState, action) {
  switch (action.type) {
    case "FORM_CHANGED":
      return handleChange(state, action);
    default:
      return state;
  }
}