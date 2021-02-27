import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatters = {
  stylish,
  plain,
  json,
};

const formatter = (diffTree, format) => formatters[format](diffTree);

export default formatter;
