function ToFridge(ingredient){
 return {
    type: 'ADD_INGREDIENT_TO_FRIDGE',
    data: ingredient	
  }
}

export function addIngredientToFridge(dispatch, ingredient) {
    //promise something, .then dispatch
	dispatch(ToFridge(ingredient)) 
} 

