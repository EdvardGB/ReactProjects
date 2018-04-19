/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { routeReducer } from './routeReducer';
import { humidityReducer } from './humidityReducer'

import languageProviderReducer from 'containers/LanguageProvider/reducer';


export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    humidity: humidityReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });
}
