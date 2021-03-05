import yaml from 'js-yaml';

const parsers = {
  json: (obj) => JSON.parse(obj),
  yml: (obj) => yaml.load(obj),
};

const parseFile = (obj, extension) => parsers[extension](obj);

export default parseFile;
