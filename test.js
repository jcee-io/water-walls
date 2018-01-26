const waterWalls = require('./waterWalls');

describe('Water Walls Tests', () => {
  test('it should return an object', () => {
  	let data = waterWalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2]);
  	expect(typeof data).toEqual('object');
  });	
  test('it should return 11 for example data', () => {
  	let { value } = waterWalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2]);
  	expect(value).toEqual(11);
  });
  test('it should return 11 for the reverse of example data', () => {
  	let { value } = waterWalls([5, 3, 7, 2, 6, 4, 5, 9, 1, 2].reverse());
  	expect(value).toEqual(11);
  });
  test('it should descending 10-1 and equal 0', () => {
  	let { value } = waterWalls([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  	expect(value).toEqual(0);
  });
  test('it should descending 1-10 and equal 0', () => {
  	let { value } = waterWalls([10, 9, 8, 7, 6, 5, 4, 3, 2, 1].reverse());
  	expect(value).toEqual(0);
  });
});