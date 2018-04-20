
function humidityAction(data){
 return {
    type: 'GET_HUMIDITY',
   	humidity: data[2].humidity,
    timestamp: data[2].timestamp
  }
}




export function getHumidity(dispatch) {
	let url = "http://phant.labben.org:8090/output/zpgZYp0QWeHZwQbYw0VBcKObDZVg.json";
	fetch(url, dispatch) 
		.then(response => response.json())
		.then(data =>{ 
			dispatch(humidityAction(data)) 
		})
}    


