/*

	Generell idé
	- Skaffe tilbud fra butikker (mattilbud ish)
	- Få opp en liste med oppskrifter 
		- basert på tilbud og hva du har i kjøleskapet
	- planlegg måltider for uken
	- Lage handleliste
		- basert på oppskrifter du har valgt
		- planlagte måltider
		- legge til egene valg
	

	Opggaver:
	- Database av oppskrifter
		- Automatisk henting av oppskrifter fra et API og lagre ingredienser som objekt
	- Kjøleskap klasse som inneholder ingredienser - begynt
	- Modell for oppskrifer class interface - begynt
	- Handleliste
		- Objekt med ingredienser
	- 


*/



import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient'
import DB from './db.js'
import IngredientComponent from './components/ingredientComponent';
import Recipe from './recipe';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import * as ingredientActions from '../../actions/ingredientActions';
import * as recipeActions from '../../actions/recipeActions';
import * as apiActions from '../../actions/apiActions';

let db = new DB

class FeedMe extends React.PureComponent { 
	constructor(props) {
	    super(props);
  	}

	componentDidMount(){

	}


	getClick(){
		
		this.props.getAPI('recipes/2653')
		
	}

	render() {

		return (
			<div>
				<button onClick={this.getClick.bind(this)}>Click me</button>
	      	</div>
	    );
	}
}

FeedMe.propTypes = {
	ingredients: PropTypes.object,
	recipes: PropTypes.object
};

FeedMe.defaultProps = {
}


function mapStateToProps(state){
	return {
		ingredients: state.get('fridge').get('ingredients'),
		recipes: state.get('recipe').get('recipies')
	};
}

function mapDispatchToProps(dispatch) {
  return {
	getAPI: (url) => {apiActions.getAPI(dispatch, url)},
	getAPIIngredient: (id) => {apiActions.getIngredient(dispatch, id)},
	addIngredientToFridge: (ingredient) => {ingredientActions.addIngredientToFridge(dispatch, ingredient)},
	removeIngredientFromFridge: (ingredient) =>{ingredientActions.removeIngredientFromFridge(dispatch, ingredient)},
	createRecipe : (recipe) => {recipeActions.createRecipe(dispatch,recipe)}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedMe)