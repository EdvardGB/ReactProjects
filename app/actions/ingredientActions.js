function AddToFridge(ingredient){
 return {
    type: 'ADD_INGREDIENT_TO_FRIDGE',
    data: ingredient	
  }
}

function RemoveFromFridge(ingredient){
    return {
        type: 'REMOVE_INGREDIENT_FROM_FRIDGE',
        data: ingredient
    }
}

export function removeIngredientFromFridge(dispatch, ingredient){
    dispatch(RemoveFromFridge(ingredient))
}

export function addIngredientToFridge(dispatch, ingredient) {
    //promise something, .then dispatch
	dispatch(AddToFridge(ingredient)) 
} 

