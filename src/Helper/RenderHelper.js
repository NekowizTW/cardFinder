import { MD5, enc } from 'crypto-js';
import _ from 'lodash';

import * as constOptions from './DataOptions';

export function findByAttribute(collection, key, value) {
  const target = collection.find((obj) => obj[key] === value);
  return target;
}

export function filterByObject(collection, predicate) {
  const [key, value] = Object.entries(predicate);
  const target = collection.find((obj) => obj[key] === value);
  return target;
}

export function twFilenameFix(filename) {
  return String(filename).charAt(0).toUpperCase() + String(filename).slice(1);
}

export function linkGenerator(filename) {
  const md5name = MD5(filename).toString(enc.Hex);
  return 'https://vignette.wikia.nocookie.net/nekowiz/images/'
  + `${md5name.charAt(0)}/${md5name.charAt(0)}${md5name.charAt(1)}/`
  + `${filename}/revision/latest?path-prefix=zh`;
}

const optionsMap = {
  prop: constOptions.PROPS,
  prop2: constOptions.PROPS2,
  breed: constOptions.BREEDS,
  'asData.type': constOptions.SKILL_AS,
  'ssData.type': constOptions.SKILL_SS,
  'as2Data.type': constOptions.SKILL_AS2,
  'ss2Data.type': constOptions.SKILL_SS2,
  'EXASData.type': constOptions.EXASType,
};

const getProperty = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) => String.prototype.split
    .call(path, regexp)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

export function reverseOptionsGenerator(card, property, delimiter = undefined) {
  let keys = getProperty(card, property);
  let res = [];
  if (keys === undefined) return res;

  let options = optionsMap[property];
  if (property.indexOf('type') >= 0) {
    options = options.reduce((collection, item) => {
      if (Object.keys(item).indexOf('options') >= 0) collection.push(...item.options);
      else collection.push(item);
      return collection;
    }, []);
  }

  if (delimiter !== undefined) {
    keys = keys.split(delimiter);
    res = options.filter((o) => {
      const regexTestKey = (key) => o.value.test(key);
      return keys.some(regexTestKey);
    });
  } else {
    res = options.filter((option) => option === keys);
  }
  return res;
}

export function uniqArray(arr) {
  return _.uniq(arr);
}
