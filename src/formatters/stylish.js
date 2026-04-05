import _ from 'lodash';

const formatStylish = (diff) => {
    const iter = (currentDiff, depth) => {
        const indent = ' '.repeat(depth*4-2);
        const bracketIndent = ' '.repeat((depth-1)*4);
        const lines = currentDiff.map((node) => {
            const { key, type } = node;
            switch (type) {
                case 'added':
                    return `${indent}+ ${key}: ${formatValue(node.value, depth + 1)}`;
                case 'removed':
                    return `${indent}- ${key}: ${formatValue(node.value, depth + 1)}`;
                case 'unchanged':
                    return `${indent}  ${key}: ${formatValue(node.value, depth + 1)}`;
                case 'modified':
                    return [
                        `${indent}- ${key}: ${formatValue(node.oldValue, depth + 1)}`,
                        `${indent}+ ${key}: ${formatValue(node.newValue, depth + 1)}`
                    ].join('\n');
                case 'nested':
                    return `${indent}  ${key}: {\n${iter(node.children, depth + 1)}\n${indent}  }`;
                default:
                    throw new Error(`Unknown type: ${type}`);
            }
        });
        return lines.join('\n');
    };

    const formatValue = (value, depth) => {
        if (_.isObject(value)) {
            const indent = ' '.repeat(depth * 4);
            const bracketIndent = ' '.repeat((depth - 1) * 4);
            const lines = Object.entries(value).map(([key, val]) => `${indent}${key}: ${formatValue(val, depth + 1)}`);
            return `{\n${lines.join('\n')}\n${bracketIndent}}`;
        }
        return String(value);
    };

    return `{\n${iter(diff, 1)}\n}`;
};

export default formatStylish;