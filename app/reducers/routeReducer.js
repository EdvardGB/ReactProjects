import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const routeInitialState = fromJS({
  location: null,
});


export function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        location: action.payload,
      });
    default:
      return state;
  }
}