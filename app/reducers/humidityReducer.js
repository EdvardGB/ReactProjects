import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';


const humidityInitialState = fromJS({
  humidity: "",
  timestamp: "",
});


function getHumidity(state, action){
  state = state.set('humidity', action.humidity);
  state = state.set('timestamp', action.timestamp);
  return state
}


export function humidityReducer(state = humidityInitialState, action) {
 
  switch (action.type) {
    case "GET_HUMIDITY":
      return getHumidity(state, action);
    default:
      return state;
  }
}