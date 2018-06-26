import { fromJS } from 'immutable';
import Ingredient from '../containers/FeedMe/ingredient.js'

const fridgeInitialState = fromJS({
  ingredients: {}
});
  

function addIngredient(oldState, action){
  let state = oldState
  let ingredients = state.get('ingredients')
  let ingredient = action.data
  ingredients[ingredient.name] = ingredient
  state = state.set('ingredients', ingredients)
  return state
}

export function fridgeReducer(state = fridgeInitialState, action) {
  switch (action.type) {
    case "ADD_INGREDIENT_TO_FRIDGE":
      return addIngredient(state, action);
    default:
      return state;
  }
}