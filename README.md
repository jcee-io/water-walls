# Water Walls Mini-Application

This fullstack mini-app is to render a graph of how walls of various heights, that are stuck together, would collect water if a hypothetical rain were to occur. the measurement of volume are by blocks, so if there were three walls stuck together with the heights 4, 2, and 5, all measured in blocks, then there will be two blocks of water trapped in between the walls whose heights are 4 and 5, and the wall whose height is 2 is submerged.

This app uses a frontend consisting of using html, css, and Vanilla JS, along with some help from other libraries via CDN suck as Bootstrap and Axios (for http requests).

The backend of the app consist of Express via Node, and utilizes an algorithm (See *Algorithms* below) that calculates and builds the wall before rendering it to the DOM.

Tests were utilized using Jest. 

# Client
	
There are two major functions within the DOM:

1) The form
2) The graph

Each of these two things have a story behind them, and plays a major role in sending an http request in a journey to retrieve data from a server.

## The Form

The form is designed to only take in numbers separated by commas, any other input would invoke an error message. After the input is submitted, a GET request is sent to the server to return a JSON consisting of an array of arrays, that make up a graph (or map) of the blocks, and an array consisting of the index of the walls that hold the largest amount of water.

## The Graph

This comes into place after the JSON containing the graph and indexes is returned from the GET request to the server. Before we render the graph, we push several blocks of air equivalent to the height of the largest wall, and label it with numbers to show the exact height of each block's location. Afterwards, once we render a section of the wall, if that section of the wall's index is included inside of the indexes array, we change the color of the block's background to be black

# Server



# Algorithms
The mini-app is based off of and calculated by an algorithm implemented and used on the backend of the application

## LINK: https://repl.it/@jvcruz/GlisteningSlateblueFlycatcher

## Summary
The function will be passed an array of numbers signifying the height of the walls stacking together, The height of the walls will be measured in blocks, as well as the amount of water gathered.

## Strategy 
The first thing that comes to mind is the concept of how we could just get the area of the distance between two walls multiplied by the shortest wall. If we simply subtract the area of the walls in between from the previously specified area, then we would have the amount of water gathered.

The function will be traversing the array, starting with the first wall in the zeroth index, and looking for the next wall that is taller than the current wall. As we traverse the array we subtract the height of the current wall with the walls we are traversing. At the end of the function we should have the largest water gathered measured, but what if the current wall's partner is a shorter wall? The key here is the traverse the walls array twice, one forwards and one backwards. This front and back traversal is a way to cover all grounds needed for water to touch. This will be the main strategy to employ

## OICE

### Output: An object that contains a value property that is the amount of water gathered, and an indexes propert that contains a tuple of the indexes.
### Input: An array of numbers that represents the height of a wall
### Edge cases: What if it wasn't an array that was passed in? What if the there exists an element of the array is NaN? 
### Constraints: None