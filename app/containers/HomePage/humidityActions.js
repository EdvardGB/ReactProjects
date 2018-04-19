
export function getHumidity(text) {
  return {
    type: 'GET_HUMIDITY',
    text
  }
}

export function humidityRecieved(humidity, timestamp){
	type: 'HUMIDITY_RECIEVED',
	humidity,
	timestamp
}