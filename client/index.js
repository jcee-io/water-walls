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

const appendDOM = (i, section, indexes, value) => {
	mapDOM.innerHTML += `<div id="${i}"></div>`;
	let wall = document.getElementById(i);

	for(let block of section){
		wall.innerHTML = block + wall.innerHTML;
	}

	if(indexes.includes(i - 1) && value > 0) {
		[...wall.children].forEach(block => {
			if(block.classList.value === "block wall"){
				block.style.background = 'black';
			}
		});	
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
    	let { map, stats } = data;
    	let { indexes, value } = stats;
    	if(isRendered) {
    		mapDOM.innerHTML = '';
    	}
    	console.log(indexes);
    	center.style.marginTop = '5%';
    	isRendered = true;

    	let labels = map[0].reduce((acc, block, index) => acc.concat(`<div class="block air">${index + 1}</div>`),[]);

    	map.unshift(labels);
    	map.forEach((section, i) => appendDOM(i, section, indexes, value));
    });

  errorMessage.textContent = '';
  object.value = '';
};