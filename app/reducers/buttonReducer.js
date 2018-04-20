import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';


const buttonInitialState = fromJS({
  value: 0,
});


function buttonClicked(state, action){
  state = state.set('value', state.get('value') +1)
  return state
}


export function buttonReducer(state = buttonInitialState, action) {
  switch (action.type) {
    case "BUTTON_CLICKED":
      return buttonClicked(state, action);
    default:
      return state;
  }
}