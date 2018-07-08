import IndexedDBInstance from '../services/indexDBService';
import Ingredient from '../containers/FeedMe/ingredient';

const offlineStore = 'OfflineStorage'

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
    IndexedDBInstance().then(instance => 
        instance.add(offlineStore, ingredient)   
    ).then(
        dispatch(AddToFridge(ingredient)) 
    )

} 

