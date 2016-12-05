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

var emptyGrid = [
'_', '_', '_',
'_', '_', '_',
'_', '_', '_'
]

rl.question('What do you think of Node.js? ', function(answer) {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);


}


rl.question('What about this module "readline"?', function(answer) {
    console.log('Thanks for responding with:', answer + '!')

    rl.close();
}
