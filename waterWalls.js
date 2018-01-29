// PLEASE READ waterWallsIndex.js before reading the rest of this code
// This uses the same logic and algorithm, except this file is designed to create a graph/map to return as a JSON
// versus returning an array of indexes and the size of the water pool

Array.prototype.reverseEach = function(callback) {
  for(let i = this.length - 1; i >= 0; i--) {
    callback(this[i], i);
  }
};

const getStats = (waterHeight, wallHeight, index) => ({ waterHeight, wallHeight, index });

const traverse = (foo, length, wallsWithWater) => {
  let peak;
  let tempWalls = [];
  foo((wall, index) => {
    peak = peak || wall;
    if(peak <= wall) {
      wallsWithWater = wallsWithWater.concat(tempWalls);
      tempWalls = [];
      peak = wall;
    }

    tempWalls.push(getStats(peak - wall, wall, index));
  });
  
  return wallsWithWater;
};

const createMap = walls => {
  const map = [];
  const wallArr = Object.keys(walls).map(index => walls[index]);
  const largestHeight = wallArr.reduce((acc, wall) => Math.max(acc, wall.wallHeight), walls[0].wallHeight);

  for(let i = 0; i < Object.keys(walls).length; i++){
    let { waterHeight, wallHeight } = walls[i];
    let temp = [];
    for(let j = 0; j <= largestHeight; j++) {
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

const createStats = (walls, wallsWithWater)  => {
  let reduced = wallsWithWater.reduce((acc, e) => {
    const { index, waterHeight, wallHeight } = e;

    acc[index] = acc[index] || { waterHeight, wallHeight };
    return acc;
  }, {});

  for(let i = 0; i < walls.length; i++) {
    reduced[i] = reduced[i] || { waterHeight: 0, wallHeight: walls[i] };
  }

  return createMap(reduced);
};

const waterWalls = walls => {
  const { forEach, reverseEach } = Array.prototype;
  let wallsWithWater = [];
  wallsWithWater = traverse(forEach.bind(walls), walls.length, wallsWithWater);
  wallsWithWater = traverse(reverseEach.bind(walls), walls.length, wallsWithWater);

  return createStats(walls, wallsWithWater);
};

module.exports = waterWalls;