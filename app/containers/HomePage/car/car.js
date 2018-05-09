import React from 'react';
import {Button} from 'react-bootstrap';

export default class Car extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
	constructor(props) {
	    super(props);
	    this.handleClick = this.handleClick.bind(this)
	    this.publish = this.publish.bind(this)
  	}

  	publish(command){
  		let publicKey = "WXVMZNDj2jCX86J039D6f6a1ek4"
  		let privateKey = "0npdaXgQjQTLMxVKrOBxiwbGrpO"
  		let postUrl = "http://phant.labben.org:8090/input/" + publicKey + "?private_key=" + privateKey + "&command=" + command
  		fetch(postUrl) 
  		console.log("published:", command)
  	}

  	handleClick(event){
  		this.publish(event.target.id)
  	}


	render() {
		return (
			<div>
				<Button id="L" onClick={this.handleClick}>Left</Button>
				<Button id="R" onClick={this.handleClick}>Right</Button>
				<Button id="F" onClick={this.handleClick}>Forward</Button>
				<Button id="B" onClick={this.handleClick}>Backwards</Button>
				<Button id="S" onClick={this.handleClick}>Stopp</Button>
	      	</div>
	    );
	}
}