#!/usr/bin/env node

import {Command} from 'commander';
import getData from './src/parser.js';
import genDiff from './src/genDiff.js';

const program = new Command();

program
    .name('gendiff')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format <type>', 'output format')
    .version('1.0.0')
    .action((filepath1, filepath2, options) => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    const diff = genDiff(data1, data2);
    console.log(diff);

});

program.parse(process.argv);