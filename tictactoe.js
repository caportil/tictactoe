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

var gameOver = false;

var assignX = function(x, y) {
  grid[x][y] = 'X';
}

var assignO = function(x, y) {
  grid[x][y] = 'O'
}

var checkWonX = function() {
  grid.forEach(function(row) {
    if (row.indexOf('O') < 0 && row.indexOf('_' < 0)) {
      gameOver = true;
      return true;
    }
  })
}

var checkWonY = function() {
  grid.forEach(function(row) {
    if (row.indexOf('Y') < 0 && row.indexOf('_' < 0)) {
      gameOver = true;
      return true;
    }
  })
}

var requestX = function(coordinate, callback) {
  // TODO: Log the answer in a database
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignX(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);


  // rl.close();
}

var requestO = function(coordinate, callback) {
  // TODO: Log the answer in a database
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignO(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);


}


rl.question('Welcome to tic-tac-toe! Player 1, please enter a coordinate in "x,y" format!', function(response) {
  requestX(response)
  rl.close();
})




// rl.question('What about this module "readline"?', function(answer) {
//     console.log('Thanks for responding with:', answer + '!')

//     rl.close();
// }
