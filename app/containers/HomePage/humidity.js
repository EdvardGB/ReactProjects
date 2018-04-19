
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import 'whatwg-fetch';

export default class Humidity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
	    super(props);
	    this.state = {
	      humidity: 0,
	      timestamp: null,
	      humidityInterval: null,
	    };
	    this.getHumidityLevel = this.getHumidityLevel.bind(this);
	}

	componentDidMount(){
		this.setState({interval: setInterval(this.getHumidityLevel, 2000)});	
	}

   	getHumidityLevel(){
   		
   		let url = "http://phant.labben.org:8090/output/zpgZYp0QWeHZwQbYw0VBcKObDZVg.json"
   		fetch(url)
		  .then(response => response.json())
		  .then(data => this.setState({humidity: data[0].humidity, timestamp: data[0].timestamp}))
   	}

	
	render() {
	return (
		<div>
	    	<div className="humidity">
	        	Humidity = 	{this.state.humidity}
	        </div>
	    </div>
	);
	}
}
