/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom';


import * as humidityActions from '../../actions/humidityActions';
import * as formActions from '../../actions/formActions';


import messages from './messages';
import Humidity from './humidity';
import FormComponent from './Form/form';
import Car from './car/car';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.getHumidity();
  }

  render() {
    return (
      <div>
      <div>
        <NavLink to="/SidePage">SidePage</NavLink>
        <NavLink to="/Connect">Connect</NavLink>
          </div>
          <div> 
            <Humidity humidity={this.props.humidity} timestamp={this.props.timestamp}/>
            <div>
              <FormComponent formData={this.props.formData} formChanged={this.props.formChanged}/>
            </div>
            <Car/>
        </div>    
      </div>
    );
  }
}

HomePage.propTypes = {
  formData: PropTypes.string,
	humidity: PropTypes.string,
	timestamp: PropTypes.string,
  pathname: PropTypes.string,
  search: PropTypes.string,
  hash: PropTypes.string,
};

HomePage.defaultProps = {
}


function mapStateToProps(state){
	return {
		humidity: state.get('humidity').get('humidity'),
		timestamp: state.get('humidity').get('timestamp'),
    pathname: state.get('route').get('location').get('pathname'),
    search: state.get('route').get('location').get('search'),
    hash: state.get('route').get('location').get('hash'),
    formData: state.get('form').get('formData')
	};
}

function mapDispatchToProps(dispatch) {
  return {
    getHumidity: () => {humidityActions.getHumidity(dispatch)},
    formChanged: (formData) => {dispatch(formActions.formChangedAction(formData))}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)