// Water Tower Summary
// 1) Find the peaks
// 2) Get water between peaks 

// To find the peaks we would need to get the area between each of the peaks
// a peak is a wall not submerged by water 


Array.prototype.forEachReverse = callback => {
  for(let i = this.length - 1; i >= 0; i--) {
    callback(this[i], i);
  }
};

const traverseWalls = walls => {
  let peak = walls[0];
  let oldIndex = 0;
  let temp = 0;
  const object = {};
  
  walls.slice(1).forEach((wall, index) => {
    if(peak < wall) {
      object[temp] = [oldIndex, index];
      oldIndex = index;
      temp = 0;
      peak = wall;
    }
    temp += peak - wall;
  });
  
  return object;
};

const waterWalls = walls => {
  let peak1, peak2;
  let totalWater = traverseWalls(walls);
  
  return totalWater
};


waterWalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2]);