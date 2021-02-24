import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (f, format) => {
  switch (format) {
    case 'stylish':
      return stylish(f);
    case 'plain':
      return plain(f);
    default:
      throw new Error('Uncnown format');
  }
};

export default formatter;
