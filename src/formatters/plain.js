import _ from 'lodash';

const formatPlain = (diff) => {
    const iter = (currentDiff, path) => {
        const lines = currentDiff.flatMap((node) => {
            const { key, type } = node;
            const fullPath = path ? `${path}.${key}` : key;
            switch (type) {
                case 'added':
                    return `Property '${fullPath}' was added with value: ${formatValue(node.value)}`;
                case 'removed':
                    return `Property '${fullPath}' was removed`;
                case 'modified':
                    return `Property '${fullPath}' was updated. From ${formatValue(node.oldValue, true)} to ${formatValue(node.newValue, true)}`;
                case 'nested':
                    return iter(node.children, fullPath);
                default:
                    return [];
            }
        });
        return lines.join('\n');
    };

    const formatValue = (value, quoteComplex = false) => {
        if (_.isObject(value)) {
            return quoteComplex ? `'[complex value]'` : '[complex value]';
        }
        if (typeof value === 'string') {
            return `'${value}'`;
        }
        return String(value);
    };

    return iter(diff, '');
};

export default formatPlain;