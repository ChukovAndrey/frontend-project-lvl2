import yaml from 'js-yaml';

const parsers = {
  json: (jsonString) => JSON.parse(jsonString),
  yml: (yamlString) => yaml.load(yamlString),
};

const parse = (receivedString, extension) => parsers[extension](receivedString);

export default parse;
