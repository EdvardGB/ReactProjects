
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'whatwg-fetch';

export default class Humidity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	render() {
		return (
			<div>
		    	<div>
		        	Humidity = 	{this.props.humidity}
		        </div>

		    </div>
		);
	}
}
