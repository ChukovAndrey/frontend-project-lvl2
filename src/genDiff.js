import _ from 'lodash';
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

const genDiff = (path1, path2) => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);

  const entries1 = Object.entries(obj1).sort();
  const entries2 = Object.entries(obj2).sort();

  const allEntries = entries1.concat(entries2);
  const uniqEntries = _.uniqWith(allEntries, _.isEqual);

  const resultWithStatus = uniqEntries.map((arrayItem) => {
    const [key, value] = arrayItem;
    if (obj1[key] === value && obj2[key] === value) {
      arrayItem.push(' ');
    } else if (obj2[key] === value) {
      arrayItem.push('+');
    } else if (obj1[key] === value) {
      arrayItem.push('-');
    }

    return arrayItem;
  });

  const outputString = resultWithStatus.reduce((acc, arrayItem) => {
    const [key, value, status] = arrayItem;
    let tmp = acc; // remove eslin no-param-reassign
    tmp += `\n\t${status} ${key}: ${value}`;
    return tmp;
  }, '');

  const fullString = `{${outputString}\n}\n`;

  return fullString;
};

export default genDiff;
