import yaml from 'js-yaml';

const parsers = {
  json: (jsonString) => JSON.parse(jsonString),
  yml: (yamlString) => yaml.load(yamlString),
};

const parse = (dataString, format) => parsers[format](dataString);

export default parse;
