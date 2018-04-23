
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom'

import * as buttonActions from '../../actions/buttonActions';


class SidePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this);
  }

//  componentDidMount(){

//  }



  onClick(event){
    this.props.buttonClick();
  }

  render() {
	
    return (
    	<div>
			<div>
				<NavLink to="/HomePage">HomePage</NavLink>
	        </div>
	        <div>	
	        	<button onClick={this.onClick}>click me</button> {this.props.value}
	    	</div>    
        </div>
    );
  }
}

SidePage.propTypes = {
  value: PropTypes.number,
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
};

SidePage.defaultProps = {
}


function mapStateToProps(state){

	return {
    	value: state.get('button').get('value'),
    	pathname: state.get('route').get('location').get('pathname'),
	    search: state.get('route').get('location').get('search'),
	    hash: state.get('route').get('location').get('hash')
	};
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClick: () => {dispatch(buttonActions.buttonClickAction())}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SidePage)