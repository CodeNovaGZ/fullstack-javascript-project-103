import getData from './parser.js';
import format from './formatters/index.js';

export default function genDiff(data1, data2, formatName = 'stylish') {
  const getData1 = getData(data1);
  const getData2 = getData(data2);
  return format(getData1, getData2, formatName);
}
