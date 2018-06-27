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
	- Kjøleskap klasse som inneholder ingredienser
	- Modell for oppskrifer class interface
	- Handleliste
		- Objekt med ingredienser
	- 


*/



import React from 'react';
import PropTypes from 'prop-types';
import Ingredient from './ingredient.js'
import DB from './db.js'
import IngredientComponent from './components/ingredientComponent';

import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import * as ingredientActions from '../../actions/ingredientActions';

let db = new DB

class FeedMe extends React.PureComponent { 
	constructor(props) {
	    super(props);
  	}

	componentDidMount(){
		db.data.forEach(element => {
			this.props.addIngredientToFridge(new Ingredient(element.name, element.info, element.param))
		});
	}

	buttonClick(){
		this.props.addIngredientToFridge(new Ingredient(Math.random(), "b", "c"))
	}

	render() {
		const {
			ingredients
		} = this.props
		return (
			<div>
				<Button onClick={this.buttonClick.bind(this)} bsStyle="info">add</Button>
				{	
					ingredients.map((element, id) => {
						element = {ingredient : element }
						return(<IngredientComponent key={id} {...element} remove={this.props.removeIngredientFromFridge}/>)
					})
				}
				
	      	</div>
	    );
	}
}

FeedMe.propTypes = {
	ingredients: PropTypes.object,
};

FeedMe.defaultProps = {
}


function mapStateToProps(state){
	return {
		ingredients: state.get('fridge').get('ingredients')
	};
}

function mapDispatchToProps(dispatch) {
  return {
	addIngredientToFridge: (ingredient) => {ingredientActions.addIngredientToFridge(dispatch, ingredient)},
	removeIngredientFromFridge: (ingredient =>{ingredientActions.removeIngredientFromFridge(dispatch, ingredient)})
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedMe)