import { fromJS } from 'immutable';
import Ingredient from '../containers/FeedMe/ingredient.js'


const fridgeInitialState = fromJS({
  recipies: []
});
  

function addRecipe(oldState, action){
  let state = oldState
  let recipies = state.get('recipies')
  let recipie = action.data
  recipies = recipies.push(recipie)
  state = state.set('recipies', recipies)
  return state
}

export function recipeReducer(state = fridgeInitialState, action) {
  switch (action.type) {
    case "CREATE_RECIPE":
      return addRecipe(state, action);
    default:
      return state;
  }
}