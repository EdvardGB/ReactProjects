function AddRecipe(recipe){
 return {
    type: 'CREATE_RECIPE',
    data: recipe	
  }
}

export function createRecipe(dispatch, recipe) {
    //promise something, .then dispatch
	dispatch(AddRecipe(recipe)) 
} 

