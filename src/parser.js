import { load } from 'js-yaml';

const getJSONData = (file) => JSON.parse(file);
const getYAMLData = (file) => load(file);

const getExtension = (type) => {
  switch (type) {
    case '.json':
      return getJSONData;
    case '.yaml':
      return getYAMLData;
    case '.yml':
      return getYAMLData;
    default:
      throw new Error(`Unsupported type - ${type}`);
  }
};
export default getExtension;
