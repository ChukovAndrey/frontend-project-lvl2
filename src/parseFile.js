import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (pathToFile) => {
  const extension = path.extname(pathToFile);
  switch (extension) {
    case '.json':
      return JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
    case '.yml':
      return yaml.load(fs.readFileSync(pathToFile, 'utf-8'));
    default:
      throw new Error('Wrong file type');
  }
};

export default parseFile;
