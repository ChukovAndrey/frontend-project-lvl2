import yaml from 'js-yaml';

const parsers = {
  json: (jsonString) => JSON.parse(jsonString),
  yml: (yamlString) => yaml.load(yamlString),
};

const parseString = (receivedString, extension) => parsers[extension](receivedString);

export default parseString;
