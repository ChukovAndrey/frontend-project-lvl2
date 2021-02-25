import _ from 'lodash';

const genObjDiff = (obj1, obj2) => {
  const keys = _.keys({
    ...obj1,
    ...obj2,
  });

  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const originalValue = obj1[key];
    const changedValue = obj2[key];

    if (_.isObject(originalValue) && _.isObject(changedValue)) {
      return {
        type: 'NESTED',
        key,
        // eslint-disable-next-line no-unused-vars
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
        newValue: changedValue,
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
