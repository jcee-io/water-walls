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
  let input;
  
  try {
  	input = JSON.parse(`[${target.value}]`);
  } catch(error) {
  	handleError(errorMessage, object);
  	return;
  }

  if(!isValid(input)) {
		handleError(errorMessage, object);
  	return;  	
  }

  let walls = axios.get(`/api/${input}`)

  errorMessage.textContent = '';
  object.value = '';
};