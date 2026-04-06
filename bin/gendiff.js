#!/usr/bin/env node

import {Command} from 'commander';
import getData from '../src/parser.js';
import genDiff from '../src/index.js';

const program = new Command();

program
    .name('gendiff')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format <type>', 'output format', 'stylish')
    .version('1.0.0')
    .action((filepath1, filepath2, options) => {
        const diff = genDiff(filepath1, filepath2, options.format);
        console.log(diff);
    });  

program.parse(process.argv);
