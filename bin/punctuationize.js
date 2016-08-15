#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const punctuationize = require('../index.js');
const commander = require('commander');

commander
  .version('0.0.1')
  .usage('[options] <file>')
  .option('-s, --space <single>', 'specify how to handle spaces [single, none, keep]', 'single')
  .option('-o, --output <file>', 'specify output file, or it will be stdout')
  .parse(process.argv);

if (!commander.args || commander.args.length !== 1) {
  commander.help();
}
if (commander.space !== 'single' &&
    commander.space !== 'none' &&
    commander.space !== 'keep') {
  commander.help();
}

let fd;
fd = fs.readFileSync(path.join('.', commander.args[0]));
fd = fd.toString();
const res = punctuationize(fd, { space: commander.space });

if (commander.output === undefined) {
  process.stdout.write(res);
} else {
  fs.writeFileSync(path.join('.', commander.output), res);
}
