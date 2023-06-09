import _ from 'lodash';

const genDiff = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const keys = _.union(keys1, keys2);
  const sorted = _.sortBy(keys);
  const result = sorted.reduce((acc, key) => {
    const [value1, value2] = [file1[key], file2[key]];

    switch (true) {
      case (_.isPlainObject(value1) && _.isPlainObject(value2)):
        return { ...acc, [key]: genDiff(value1, value2) };
      case (!_.has(file1, key)):
        return { ...acc, [key]: { value: value2, diff_status: 'added' } };
      case (!_.has(file2, key)):
        return { ...acc, [key]: { value: value1, diff_status: 'deleted' } };
      case (_.isEqual(value1, value2)):
        return { ...acc, [key]: { value: value1, diff_status: 'equal' } };
      case (!_.isEqual(value1, value2)):
        return { ...acc, [key]: { value: value1, value2, diff_status: 'changed' } };
      default:
        throw new Error('Unsupported values');
    }
  }, { });

  return result;
};

export default genDiff;
