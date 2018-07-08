import { fromJS } from 'immutable';
import Ingredient from '../containers/FeedMe/ingredient.js'

import IndexedDBInstance from '../services/indexDBService';

const fridgeInitialState = fromJS({
  ingredients: []
});
  

function removeIngredient(oldState, action){
  let state = oldState
  let ingredients = state.get('ingredients')
  ingredients = ingredients.splice(ingredients.indexOf(action.data), 1)
  state = state.set('ingredients', ingredients)
  return state
}

function addIngredientList(oldState, action){
  let state = oldState
  let ingredients = state.get('ingredients')
  action.data.forEach(element => {
    ingredients = ingredients.push(element)  
  })
  state = state.set('ingredients', ingredients)
  return state
}

function addIngredient(oldState, action){
  let state = oldState
  let ingredients = state.get('ingredients')
  let ingredient = action.data
  ingredients = ingredients.push(ingredient)
  state = state.set('ingredients', ingredients)
  console.log(state)
  return state
}

export function fridgeReducer(state = fridgeInitialState, action) {
  switch (action.type) {
    case "REMOVE_INGREDIENT_FROM_FRIDGE":
      return removeIngredient(state, action);
    case "ADD_INGREDIENT_TO_FRIDGE":
      return addIngredient(state, action);
    default:
      return state;
  }
}