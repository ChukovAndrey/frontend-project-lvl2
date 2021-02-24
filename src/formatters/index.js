import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (f, format) => {
  switch (format) {
    case 'stylish':
      return stylish(f);
    case 'plain':
      return plain(f);
    case 'json':
      return json(f);
    default:
      throw new Error('Uncnown format');
  }
};

export default formatter;
