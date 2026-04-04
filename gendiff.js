#!/usr/bin/env node

import {Command} from 'commander';
import getData from './src/parser.js';

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

    console.log('Archivo 1:', data1);
    console.log('Archivo 2:', data2);

});

program.parse(process.argv);