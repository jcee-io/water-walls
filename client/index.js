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


const createMap = walls => {
	const map = [];
	const wallArr = Object.keys(walls).map(index => walls[index]);
	const largestHeight = wallArr.reduce((acc, wall) => Math.max(acc, wall.wallHeight), walls[0].wallHeight);

	for(let i = 0; i < Object.keys(walls).length; i++){
		let { waterHeight, wallHeight } = walls[i];
		let temp = [];
		for(let j = 0; j < largestHeight; j++) {
			if(wallHeight > 0) {
				temp.push('<div class="block wall"></div>');
				wallHeight--;
			} else if (waterHeight > 0) {
				temp.push('<div class="block water"></div>');
				waterHeight--;
			} else {
				temp.push('<div class="block air"></div>');
			}
		}
		map.push(temp);
	}

	console.log(largestHeight);
	return map;
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
    .then(({ data }) => createMap(data))
    .then(map => {

    	if(isRendered) {
    		mapDOM.innerHTML = '';
    	}

    	center.style.marginTop = '5%';
    	isRendered = true;

    	for(let i = 0; i < map.length; i++) {
    		mapDOM.innerHTML += `<div id="${i}"></div>`;
    		let wall = document.getElementById(i);
    		console.log(wall);
    		for(let block of map[i]){
    			wall.innerHTML = block + wall.innerHTML;
    		};
    	}
    });

  errorMessage.textContent = '';
  object.value = '';
};