import React from 'react';

import Navbar from './Components/navbar';

export default class Connect extends React.PureComponent { 
	constructor(props) {
	    super(props);
  	}

	render() {
		return (
			<div>
				<Navbar />
	      	</div>
	    );
	}
}