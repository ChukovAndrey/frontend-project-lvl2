#!/usr/bin/env node
import commander from 'commander';

const program = new commander.Command();

program
  .usage('[options] <filepath1> <filepath2>')
  .version('0.0.1', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
