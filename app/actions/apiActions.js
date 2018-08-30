import Ingredient from '../containers/FeedMe/Ingredient';

import * as apiService from '../services/apiService';

import * as ingredientActions from './ingredientActions';


   

export function getIngredient(dispatch, id){
    apiService.getAPIProduct('products', id).then(response => response.json()
		.then(data => {
			console.log(data)
			data.detail ? null : ingredientActions.addIngredientToFridge(dispatch, new Ingredient(data))
		}))
}

export function getAPI(dispatch, url){
	apiService.getAPI(url).then(response => response.json()
	.then(data => console.log(data)
	))
}