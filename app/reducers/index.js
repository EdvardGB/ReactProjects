/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { routeReducer } from './routeReducer';
import { humidityReducer } from './humidityReducer';
import { buttonReducer } from './buttonReducer';
import { formReducer } from './formReducer';
import { fridgeReducer } from './fridgeReducer'; 
import { recipeReducer } from './recipeReducer'; 

import languageProviderReducer from 'containers/LanguageProvider/reducer';


export default function createReducer(injectedReducers) {
  return combineReducers({
    route: routeReducer,
    humidity: humidityReducer,
    language: languageProviderReducer,
    button: buttonReducer,
    form: formReducer,
    fridge: fridgeReducer,
    recipe: recipeReducer,
    ...injectedReducers,
  });
}
