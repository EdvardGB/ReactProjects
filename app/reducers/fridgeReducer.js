import { fromJS } from 'immutable';


const fridgeInitialState = fromJS({
  shelf: { ingredient: "greskar" },
});


export function fridgeReducer(state = fridgeInitialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}