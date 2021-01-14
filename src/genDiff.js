import _ from 'lodash';
import fs from 'fs';

const genDiff = (path1, path2) => {
  const json1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const json2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));

  const entries1 = Object.entries(json1).sort();
  const entries2 = Object.entries(json2).sort();

  const allEntries = entries1.concat(entries2);
  const uniqEntries = _.uniqWith(allEntries, _.isEqual);

  const resultWithStatus = uniqEntries.map((arrayItem) => {
    const [key, value] = arrayItem;
    if (json1[key] === value && json2[key] === value) {
      arrayItem.push(' ');
    } else if (json2[key] === value) {
      arrayItem.push('+');
    } else if (json1[key] === value) {
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

  const fullString = `{${outputString}\n}`;

  return fullString;
};

export default genDiff;
