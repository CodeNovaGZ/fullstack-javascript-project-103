import formatStylish from './stylish.js';
import formatPlain from './plain.js';
import formatJson from './json.js';
import buildDiff from '../treeBuilder.js';

export default function format(data1, data2, formatName) {
    const diff = buildDiff(data1, data2);

    if (!formatName) {
        return diff;
    }

    if (formatName === 'stylish') {
        return formatStylish(diff);
    }

    if (formatName === 'plain') {
        return formatPlain(diff);
    }

    if (formatName === 'json') {
        return formatJson(diff);
    }

    throw new Error(`Unknown format: ${formatName}`);
}
