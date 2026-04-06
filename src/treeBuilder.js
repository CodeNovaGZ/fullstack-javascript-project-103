import _ from 'lodash';

const buildDiff = (data1, data2) => {
    const allKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
    return allKeys.map((key) => {
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
            const nestedDiff = buildDiff(data1[key], data2[key]);
            return { key, type: 'nested', children: nestedDiff };
        }
        if (!_.has(data1, key)) {
            return { key, value: data2[key], type: 'added' };
        }
        if (!_.has(data2, key)) {
            return { key, value: data1[key], type: 'removed' };
        }
        if (_.isEqual(data1[key], data2[key])) {
            return { key, value: data1[key], type: 'unchanged' };
        }
        return { key, type: 'modified', oldValue: data1[key], newValue: data2[key] };
    });
};

export default buildDiff;
