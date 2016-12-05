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

rl.question('What do you think of Node.js? ', function(answer) {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);
  assignX(1,1);
  console.log('Current grid:', grid)


  rl.close();
})


// rl.question('What about this module "readline"?', function(answer) {
//     console.log('Thanks for responding with:', answer + '!')

//     rl.close();
// }
