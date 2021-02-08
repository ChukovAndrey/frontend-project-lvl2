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

const genObjDiff = (obj1, obj2) => {
  const keys = Object.keys({
    ...obj1,
    ...obj2,
  }).sort();

  const resultWithStatus = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'NESTED',
        key,
        children: genObjDiff(value1, value2),
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        type: 'DELETED',
        key,
        value1,
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'ADDED',
        key,
        value1,
      };
    }
    if (value1 === value2) {
      return {
        type: 'UNCHANGED',
        key,
        value1,
      };
    }
    return {
      type: 'CHANGED',
      key,
      value1,
      value2,
    };
  });

  // const outputString = resultWithStatus.reduce((acc, arrayItem) => {
  //   const [key, value, status] = arrayItem;
  //   let tmp = acc; // remove eslin no-param-reassign
  //   tmp += `\n\t${status} ${key}: ${value}`;
  //   return tmp;
  // }, '');

  // const fullString = `{${outputString}\n}\n`;

  // return fullString;
  return resultWithStatus;
};

const genDiff = (path1, path2) => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);

  return genObjDiff(obj1, obj2);
};

export default genDiff;
