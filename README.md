# Water Walls

This mini-app is designed with a function that attains the amount of water gathered between two walls.

## Summary
The function will be passed an array of numbers signifying the height of the walls stacking together, The height of the walls will be measured in blocks, as well as the amount of water gathered.

## Strategy 
The first thing that comes to mind is the concept of how we could just get the area of the distance between two walls multiplied by the shortest wall. If we simply subtract the area of the walls in between from the previously specified area, then we would have the amount of water gathered.

The function will be traversing the array, starting with the first wall in the zeroth index, and looking for the next wall that is taller than the current wall. As we traverse the array we subtract the height of the current wall with the walls we are traversing. At the end of the function we should have the largest water gathered measured, but what if the current wall's partner is a shorter wall? The key here is the traverse the walls array twice, one forwards and one backwards. This front and back traversal is a way to cover all grounds needed for water to touch. This will be the main strategy to employ

## OICE