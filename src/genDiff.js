import parseFile from './parseFile.js';
import genObjDiff from './genObjDiff.js';
import formatter from './formatters/index.js';

const genDiff = (path1, path2, format) => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);

  return formatter(genObjDiff(obj1, obj2), format);
};

export default genDiff;
