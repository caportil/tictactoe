#!/usr/bin/env node

/**
 * Module dependencies.
 */
var readline = require('readline');
var Promise = require('bluebird');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var grid = [
['_', '_', '_'],
['_', '_', '_'],
['_', '_', '_']
];

var assignX = function(x, y) {
  grid[x][y] = 'X';
}

var assignY = function(x, y) {
  grid[x][y] = 'Y'
}

rl.question('Welcome to tic-tac-toe! Player 1, please enter a coordinate in "x,y" format!', function(coordinate) {
  // TODO: Log the answer in a database
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignX(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);


  rl.close();
})


// rl.question('What about this module "readline"?', function(answer) {
//     console.log('Thanks for responding with:', answer + '!')

//     rl.close();
// }
