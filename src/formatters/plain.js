import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const plainFormatter = (diff) => {
  const iter = (tree, path) => tree.flatMap((node) => {
    const {
      type, key, value, newValue, children,
    } = node;

    const outputValue = stringify(newValue);
    const outputOldValue = stringify(value);
    const currentPath = [...path, key];
    const currentPathStr = currentPath.join('.');

    switch (type) {
      case 'NESTED':
        return iter(children, currentPath);
      case 'ADDED':
        return `Property '${currentPathStr}' was added with value: ${outputValue}`;
      case 'DELETED':
        return `Property '${currentPathStr}' was removed`;
      case 'CHANGED':
        return `Property '${currentPathStr}' was updated. From ${outputOldValue} to ${outputValue}`;
      case 'UNCHANGED':
        return null;
      default:
        throw new Error(`wrong type ${type}`);
    }
  });

  return iter(diff, []).filter((item) => item !== null).join('\n');
};

export default plainFormatter;
