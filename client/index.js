const errorMessage = document.getElementById('error-message');
const mapDOM = document.getElementById('map');
const center = document.getElementById('center');

let isRendered = false;

const isValid = input => {
  return input.every(e => typeof e === 'number');
};

const handleError = (errorMessage, object) => {
  object.value = '';
  errorMessage.textContent = 'Please enter a valid search';
};

const appendDOM = (i, section) => {
	mapDOM.innerHTML += `<div id="${i}"></div>`;
	let wall = document.getElementById(i);
	console.log(wall);
	for(let block of section){
		wall.innerHTML = block + wall.innerHTML;
	}
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
    .then(({ data }) => {
    	let map = data;
    	if(isRendered) {
    		mapDOM.innerHTML = '';
    	}

    	center.style.marginTop = '5%';
    	isRendered = true;

    	map.forEach((section, i) => appendDOM(i, section));
    });

  errorMessage.textContent = '';
  object.value = '';
};