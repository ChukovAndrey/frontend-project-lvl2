import fs from 'fs';
import path from 'path';
import parseFile from './parsers.js';
import genObjDiff from './genObjDiff.js';
import formatter from './formatters/index.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  const obj1 = fs.readFileSync(path1, 'utf-8');
  const obj2 = fs.readFileSync(path2, 'utf-8');

  const parsedObj1 = parseFile(obj1, extension1);
  const parsedObj2 = parseFile(obj2, extension2);

  return formatter(genObjDiff(parsedObj1, parsedObj2), format);
};

export default genDiff;
