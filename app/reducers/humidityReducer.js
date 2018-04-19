import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const humidityInitialState = fromJS({
  humidity: 100,
  timestamp: 100,
});

function getHumidity(state, action){
  console.log("getting humidity")
  return state
}

function humidityRecieved(state, action){
  state.merge({
        humidity: action.humidity,
        timestamp: action.timestamp,
      });
  return state
}

export function humidityReducer(state = humidityInitialState, action) {
  let staticData = []; 
  switch (action.type) {
    case "GET_HUMIDITY":
      return getHumidity(state, action);
    case "HUMIDITY_RECIEVED":
      return humidityRecieved(state, action);
    default:
      return state;
  }
}