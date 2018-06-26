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

import { connect } from 'react-redux';

class FeedMe extends React.PureComponent { 
	constructor(props) {
	    super(props);
  	}

	render() {
		const {
			shelf
		} = this.props
		return (
			<div>
				{shelf.forEach(value => {
					console.log(value)
					return (<div id="test">hello</div>) //foreach nryr seg ikke om return, finn en annen måte
					})
				}
	      	</div>
	    );
	}
}

FeedMe.propTypes = {
	shelf: PropTypes.object,
};

FeedMe.defaultProps = {
}


function mapStateToProps(state){
	return {
		shelf: state.get('fridge').get('shelf')
	};
}

function mapDispatchToProps(dispatch) {
  return {
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedMe)