function AddRecipe(recipe){
 return {
    type: 'CREATE_RECIPE',
    data: recipe	
  }
}

export function createRecipe(dispatch, recipe) {
	dispatch(AddRecipe(recipe)) 
} 

