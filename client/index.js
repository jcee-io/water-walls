const errorMessage = document.getElementById('error-message');


const isValid = input => {
  return input.every(e => typeof e === 'number');
};

const handleError = (errorMessage, object) => {
  object.value = '';
  errorMessage.textContent = 'Please enter a valid search';
};

const handler = ({ key, target }, object) => {
  if(key !== 'Enter') return;
  let params;
  
  try {
  	params = JSON.parse(`[${target.value}]`);
  } catch(error) {
  	handleError(errorMessage, object);
  	return;
  }

  if(!isValid(params)) {
		handleError(errorMessage, object);
  	return;  	
  }

  axios.get(`/api`, { params })
    .then(console.log);

  errorMessage.textContent = '';
  object.value = '';
};