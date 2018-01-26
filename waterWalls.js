// Water Tower Summary
// 1) Find the peaks
// 2) Get water between peaks 

// To find the peaks we would need to get the area between each of the peaks
// a peak is a wall not submerged by water 


Array.prototype.forEachReverse = callback => {
  for(let i = this.length - 1; i >= 0; i--) {
    console.log(i);
    callback(this[i], i);
  }
};

const traverseWalls = walls => {
  let peak = walls[0];
  let oldIndex = 0;
  let temp = 0;
  const object = {};
  
  walls.forEach((wall, index) => {
    if(peak < wall) {
      object[temp] = [oldIndex, index];
      oldIndex = index;
      temp = 0;
      peak = wall;
    }
    if(index !== 0) {
      temp += peak - wall;
    }
    
  });
  
  peak = walls.pop();
  oldIndex = walls.length;
  
  for(let index = walls.length; index >= 0; index--) {
    temp = temp || 0;
    wall = walls[index];
    if(peak < wall) {
      console.log(temp);
      object[temp] = [oldIndex, index];
      oldIndex = index;
      temp = 0;
      peak = wall;
    }
    temp += peak - wall;
  }

  
  console.log('object');
  return object;
};

const waterWalls = walls => {
  let peak1, peak2;
  let totalWater = traverseWalls(walls.slice());
  let largest;
  for(let amount of Object.keys(totalWater).map(Number)) {
    largest = largest || amount;
    
    if(amount > largest) {
      largest = amount;
    }
  }
  
  console.log(totalWater);
  return ({
    amount: largest,
    indexes: totalWater[largest]
  });
};


waterWalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2]);