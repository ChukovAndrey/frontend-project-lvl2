const mapping = {
  DELETED: '- ',
  ADDED: '+ ',
  UNCHANGED: ' ',
  CHANGED: '',
  NESTED: '',
};

const spacerSymbol = ' ';
const baseShift = 4;

const genSpacer = (deep, type = 'NESTED') => spacerSymbol.repeat(baseShift * deep - mapping[type].length);

const stringify = (obj, depth = 1) => {
  const iter = (currentValue, currentDepth) => {
    if (!(currentValue instanceof Object)) {
      return String(currentValue);
    }

    const lines = Object.entries(currentValue).map(([key, val]) => `${genSpacer(currentDepth + 1)}${key}: ${iter(val, currentDepth + 1)}`);

    return [
      '{',
      ...lines,
      `${genSpacer(currentDepth)}}`,
    ].join('\n');
  };

  return iter(obj, depth);
};

const stylishFormatter = (tree) => {
  const iter = (currentTree, deep = 1) => {
    const lines = currentTree.map(({
      type, key, value, newValue, children,
    }) => {
      switch (type) {
        case 'NESTED':
          return `${genSpacer(deep, 'NESTED')}${key}: ${iter(children, deep + 1)}`;
        case 'ADDED':
          return `${genSpacer(deep, 'ADDED')}${mapping.ADDED}${key}: ${stringify(newValue, deep)}`;
        case 'CHANGED':
          return [
            `${genSpacer(deep, 'DELETED')}${mapping.DELETED}${key}: ${stringify(value, deep)}`,
            `${genSpacer(deep, 'ADDED')}${mapping.ADDED}${key}: ${stringify(newValue, deep)}`,
          ].join('\n');
        default:
          return `${genSpacer(deep, type)}${mapping[type]}${key}: ${stringify(value, deep)}`;
      }
    }).join('\n');

    return [
      '{',
      lines,
      `${genSpacer(deep - 1)}}`,
    ].join('\n');
  };

  return iter(tree);
};

export default stylishFormatter;
