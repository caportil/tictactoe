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

// Establish blank grid
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

function checkPlayerVictory(token, opponent) {
  // Check if any horizontal victories
  grid.forEach(function(row, idx) {
    if (row.indexOf(opponent) < 0 && row.indexOf('_') < 0) {
      console.log(token + ' victory across row ' + idx + '!')
      gameOver = true;
      return;
    }
  })

  // Check if any column victories
  for (var column = 0; column < grid.length; column++) {
    if (grid[0][column] === token && grid[1][column] === token && grid[2][column] === token) {
      gameOver = true;
      break;
    }
  }

  // Top left location === 0,0
  // Middle location === 1,1
  // Bottom right location === 2,2
  // Check if three going from top left -> bottom right === victory
  if (grid[0][0] === token && grid[1][1] === token && grid[2][2] === token ) {
    gameOver = true;
    return;
  }

  // Check if opposite direction (0,2 -> 1,1 -> 2,0 )
  if (grid[0][2] === token && grid[1][1] === token && grid[2][0] === token ) {
    gameOver = true;
    return;
  }
}

function checkWonX()  {
  checkPlayerVictory('X', 'O');

  if (gameOver) {
    console.log('gameOver has officially been set to true!')
    endGame();
    return true;
  }
}

function checkWonO() {
  checkPlayerVictory('O', 'X');

  if (gameOver) {
    console.log('gameOver has officially been set to true!')
    endGame();
    return true;
  }
}

function checkGameOver(callback) {
  if (checkWonX() || checkWonO()) {
    console.log('Game over!')
  } else {
    console.log('Beginning new turn!')
    callback();
  }
}

function requestX(coordinate, callback) {
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignX(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);

  checkGameOver(callback);
}

function requestO(coordinate, callback) {
  // TODO: Log the answer in a database
  var coordinate = coordinate.split(",").map(function(string) {return Number(string)});
  console.log(coordinate, typeof coordinate[0])
  assignO(coordinate[0], coordinate[1]);
  console.log(`Thank you for your selection! Current grid:`, grid);

  checkGameOver(callback);
}

function runPlayer1Turn() {
  rl.question('Player 1, please enter a coordinate in "x,y" format!', function(response) {
    requestX(response, runPlayer2Turn);
  })
}

function runPlayer2Turn() {
  rl.question('Player 2, please enter a coordinate in "x,y" format!', function(response) {
    requestO(response, runPlayer1Turn);
  })
  
}

runPlayer1Turn();
