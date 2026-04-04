import _ from 'lodash';

export default function genDiff(data1, data2) {
    const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
    const diff = allKeys.map((key) => {
        if (!_.has(data1, key)) {
            return `+ ${key}: ${data2[key]}`;
        }
        if (!_.has(data2, key)) {
            return `- ${key}: ${data1[key]}`;
        }
        if (_.isEqual(data1[key], data2[key])) {
            return `  ${key}: ${data1[key]}`;
        }
        return `- ${key}: ${data1[key]}\n+ ${key}: ${data2[key]}`;
    });
    return diff.join('\n');
}