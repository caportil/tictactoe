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

var endGame = function() {
  console.log('End game reached!')
  rl.close();
}

var checkWonX = function() {
  // Check if any horizontal victories
  grid.forEach(function(row, idx) {
    if (row.indexOf('O') < 0 && row.indexOf('_') < 0) {
      console.log('X victory across row ' + idx + '!')
      gameOver = true;
    }
  })

  // Top left location === 0,0
  // Middle location === 1,1
  // Bottom right location === 2,2
  // Check if three going from top left -> bottom right === victory
  if (grid[0][0] === 'X' && grid[1][1] === 'X' grid[2][2] === 'X' ) {
    gameOver = true;
  }

  // Check if opposite direction (0,2 -> 1,1 -> 2,0 )
  if (grid[0][2] === 'X' && grid[1][1] === 'X' grid[2][0] === 'X' ) {
    gameOver = true;
  }

  if (gameOver) {
    console.log('gameOver has officially been set to true!')
    endGame();
    return true;
  }
  console.log('Still running checkWonX...')
}

var checkWonO = function() {
  grid.forEach(function(row, idx) {
    if (row.indexOf('X') < 0 && row.indexOf('_') < 0) {
      console.log('O victory across row ' + idx + '!')
      gameOver = true;
    }
  })

  if (gameOver) {
    console.log('gameOver has officially been set to true!')
    endGame();
    return true;
  }
  console.log('Still running checkWonO...')
}

var checkGameOver = function(callback) {
  if (checkWonX() || checkWonO()) {
    console.log('Game over!')
  } else {
    console.log('Beginning new turn!')
    callback();
  }
}

var requestX = function(coordinate, callback) {
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignX(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);

  checkGameOver(callback);
}

var requestO = function(coordinate, callback) {
  // TODO: Log the answer in a database
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignO(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);

  checkGameOver(callback);
}

var runPlayer1Turn = function() {
  rl.question('Player 1, please enter a coordinate in "x,y" format!', function(response) {
    requestX(response, runPlayer2Turn);
  })
}

var runPlayer2Turn = function() {
  rl.question('Player 2, please enter a coordinate in "x,y" format!', function(response) {
    requestO(response, playFullTurn);
  })
  
}

var playFullTurn = function() {
  runPlayer1Turn();
}

playFullTurn();
