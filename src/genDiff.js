import parseFile from './parseFile.js';
import genObjDiff from './genObjDiff.js';

const genDiff = (path1, path2) => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);

  return genObjDiff(obj1, obj2);
};

export default genDiff;
