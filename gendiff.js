#!/usr/bin/env node

import {Command} from 'commander';
import formatStylish from './src/formatters/stylish.js';
import getData from './src/parser.js';
import genDiff from './src/genDiff.js';

const program = new Command();

program
    .name('gendiff')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference')
    .option('-f, --format <type>', 'output format', 'stylish')
    .version('1.0.0')
    .action((filepath1, filepath2, options) => {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);
    const diff = genDiff(data1, data2);
    let result;
    if (options.format === 'stylish') {
        result = formatStylish(diff);
    } else {
        throw new Error(`Unknown format: ${options.format}`);
    }
    console.log(result);

});

program.parse(process.argv);