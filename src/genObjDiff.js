import _ from 'lodash';

const genObjDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const originalValue = obj1[key];
    const changedValue = obj2[key];

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
        newValue: changedValue,
      };
    }
    if (_.isObject(originalValue) && _.isObject(changedValue)) {
      return {
        type: 'NESTED',
        key,
        children: genObjDiff(originalValue, changedValue),
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

export default genObjDiff;
