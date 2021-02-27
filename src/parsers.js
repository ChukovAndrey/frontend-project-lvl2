import yaml from 'js-yaml';

const parseFile = (obj, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(obj);
    case '.yml':
      return yaml.load(obj);
    default:
      throw new Error('Wrong file type');
  }
};

export default parseFile;
