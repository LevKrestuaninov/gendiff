import _ from 'lodash';

const makeStylish = (diff) => {
  const diffSymbol = {
    added: '  + ',
    deleted: '  - ',
    equal: '    ',
  };

  const indent = '    ';

  const iter = (nest, depth) => {
    if (!_.isPlainObject(nest)) {
      return `${nest}`;
    }

    const endBracketPadding = indent.repeat(depth);
    const padding = `${indent.repeat(depth + 1)}`;
    const sorted = _.sortBy(Object.entries(nest));

    const lines = sorted.reduce((acc, [key, value]) => {
      const lineMaker = (k = key, v = value, p = padding) => `${p}${k}: ${iter(v, depth + 1)}`;
      const status = (value || { }).diff_status;

      if (status === 'changed') {
        const newPadding = `${indent.repeat(depth)}${diffSymbol.deleted}`;
        const newPadding2 = `${indent.repeat(depth)}${diffSymbol.added}`;
        return [...acc, lineMaker(key, nest[key].value, newPadding),
          lineMaker(key, nest[key].value2, newPadding2)];
      }

      if (status) {
        const newPadding = `${indent.repeat(depth)}${diffSymbol[status]}`;
        return [...acc, lineMaker(key, nest[key].value, newPadding)];
      }

      return [...acc, lineMaker()];
    }, []);
    return ['{', ...lines, `${endBracketPadding}}`].join('\n');
  };

  return iter(diff, 0);
};

export default makeStylish;
