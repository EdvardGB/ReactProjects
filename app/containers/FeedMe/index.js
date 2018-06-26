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


import { connect } from 'react-redux';

import * as ingredientActions from '../../actions/ingredientActions';


class FeedMe extends React.PureComponent { 
	constructor(props) {
	    super(props);
  	}

	componentDidMount(){
		this.props.addIngredientToFridge(new Ingredient('dispatch'))
	}

	render() {
		const {
			ingredients
		} = this.props
		return (
			<div>
				{console.log(ingredients)}
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
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedMe)