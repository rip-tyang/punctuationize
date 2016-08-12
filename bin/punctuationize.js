#!/usr/bin/env node

const punctuationize = require('../index.js');
const commander = require('commander');

commander
  .version('0.0.1')
  .option('-s, --space [single]', 'specify how to handle spaces [single, none, keep]', 'single')
  .option('-o, --output <file>', 'output file')
  .parse(process.argv);

console.log('output' + commander.output);
console.log('space' + commander.space);
