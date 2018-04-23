import React from 'react';
import { Form, Text } from 'react-form';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

export default class FormComponent extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
	    super(props);

	    this.handleChange = this.handleChange.bind(this);
	    this.buttonClick = this.buttonClick.bind(this);
	    this.state = {
	      formData: this.props.formData,
	      serverData: ''
	    };
  	}

	getValidationState() {
	    const length = this.state.formData.length;
	    if (length > 10) return 'success';
	    else if (length > 5) return 'warning';
	    else if (length > 0) return 'error';
	    return null;
	  }

	handleChange(e) {
    	this.setState({ formData: e.target.value });
    	this.props.formChanged(this.state.formData);
  	}

  	buttonClick(){
  		let url = "http://188.166.99.96:3000/db";

		var data = {
		   "username": "test",
		   "password": "test"
		}

		fetch(url, {
		   method: "POST",
		   body:  JSON.stringify(data)
		})
		.then(function(response){ 
		 return response.json();   
		})
		.then(function(data){ 
		console.log(data)
		});
		
  	}

	render() {
		return (
			<div>
				<button onClick={this.buttonClick}>click me!</button>
		      <form>
		        <FormGroup
		          controlId="formBasicText"
		          validationState={this.getValidationState()}
		        >
		          <ControlLabel>Working example with validation</ControlLabel>
		          <FormControl
		            type="text"
		            value={this.state.formData}
		            placeholder="Enter text"
		            onChange={this.handleChange}
		          />
		          <FormControl.Feedback />
		          <HelpBlock>Validation is based on string length.</HelpBlock>
		        </FormGroup>
		      </form>
	      </div>
	    );
	}
}