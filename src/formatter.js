const spacer = '    ';

const stringify = (obj, depth = 1) => {
  // eslint-disable-next-line no-shadow
  const iter = (currentValue, depth) => {
    if (!(currentValue instanceof Object)) {
      return String(currentValue);
    }

    const lines = Object.entries(currentValue).map(([key, val]) => `${spacer.repeat(depth + 1)}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${spacer.repeat(depth)}}`,
    ].join('\n');
  };

  return iter(obj, depth);
};

const formatter = (tree) => {
  const mapping = {
    DELETED: '- ',
    ADDED: '+ ',
    UNCHANGED: ' ',
    CHANGED: '+-',
    NESTED: '',
  };

  const spacerSymbol = ' ';
  const baseShift = 4;

  const genSpacer = (deep, type = 'NESTED') => spacerSymbol.repeat(baseShift * deep - mapping[type].length);

  const iter = (currentTree, deep = 1) => {
    const lines = currentTree.map(({
      type, key, value, newValue, children,
    }) => {
      if (type === 'NESTED') {
        return `${genSpacer(deep, 'NESTED')}${key}: ${iter(children, deep + 1)}`;
      }

      if (type === 'CHANGED') {
        return [
          `${genSpacer(deep, 'DELETED')}${mapping.DELETED}${key}: ${stringify(value, deep)}`,
          `${genSpacer(deep, 'ADDED')}${mapping.ADDED}${key}: ${stringify(newValue, deep)}`,
        ].join('\n');
      }

      return `${genSpacer(deep, type)}${mapping[type]}${key}: ${stringify(value, deep)}`;
    }).join('\n');

    return [
      '{',
      lines,
      `${genSpacer(deep - 1)}}`,
    ].join('\n');
  };

  return iter(tree);
};

export default formatter;
