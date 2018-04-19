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

import * as humidityActions from './humidityActions';
import messages from './messages';
import Humidity from './humidity';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  componentDidMount(){
    this.props.getHumidity();
  }

  render() {
    return (
      <h1>
        <Humidity humidity={this.props.humidity} timestamp={this.props.timestamp}/>
      </h1>
    );
  }
}

HomePage.propTypes = {
	humidity: PropTypes.number,
	timestamp: PropTypes.number,
};


function mapStateToProps(state){

	return {
		humidity: state.get('humidity').get('humidity'),
		timestamp: state.get('humidity').get('timestamp')
	};
}

function mapDispatchToProps(dispatch) {
  return {
    getHumidity: () => {dispatch(humidityActions.getHumidity())}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)