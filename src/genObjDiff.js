import _ from 'lodash';

const genObjDiff = (obj1, obj2) => {
  const keys = Object.keys({
    ...obj1,
    ...obj2,
  }).sort();

  return keys.map((key) => {
    const originalValue = obj1[key];
    const changedValue = obj2[key];

    if (_.isObject(originalValue) && _.isObject(changedValue)) {
      return {
        type: 'NESTED',
        key,
        children: genObjDiff(originalValue, changedValue),
      };
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return {
        type: 'DELETED',
        key,
        value: originalValue,
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'ADDED',
        key,
        value: changedValue,
      };
    }
    if (originalValue === changedValue) {
      return {
        type: 'UNCHANGED',
        key,
        value: originalValue,
      };
    }
    return {
      type: 'CHANGED',
      key,
      value: originalValue,
      newValue: changedValue,
    };
  });
};
