import CryptoJS from 'crypto-js';
import _ 		from 'lodash';

import * as constOptions from '../data_options.js';

export function tw_filenameFix (filename) {
  return String(filename).charAt(0).toUpperCase() + String(filename).slice(1)
}

export function linkGenerator (filename) {
  let rand = Math.floor((Math.random() * 4) + 1)
  let md5name = CryptoJS.MD5(filename).toString(CryptoJS.enc.Hex);
  return `https://vignette${rand}.wikia.nocookie.net/nekowiz/images/`
  			+ `${md5name.charAt(0)}/${md5name.charAt(0)}${md5name.charAt(1)}/`
  			+ `${filename}/revision/latest?path-prefix=zh`
}

const optionsMap = {
	'prop': constOptions.PROPS,
	'prop2': constOptions.PROPS2,
	'breed': constOptions.BREEDS,
	'asData.type': constOptions.SKILL_AS,
	'ssData.type': constOptions.SKILL_SS,
	'as2Data.type': constOptions.SKILL_AS2,
	'ss2Data.type': constOptions.SKILL_SS2,
	'EXASData.type': constOptions.EXAS_Type
}

export function reverseOptionsGenerator (card, property, delimiter = undefined) {
  let keys = _.get(card, property)
  let res = []
  if (keys === undefined) return res

  let options = optionsMap[property]
  if (property.indexOf('type') >= 0)
  	options = options.reduce((collection, item) => {
      if (Object.keys(item).indexOf('options') >= 0) collection.push(...item.options);
      else collection.push(item);
      return collection;
    }, []);

  if (delimiter !== undefined) {
    keys = keys.split(delimiter);
    res = options.filter(o => {
      const regexTestKey = (key) => {
        return o.value.test(key);
      }
      return keys.some(regexTestKey);
    });
  } else {
    res = _.filter(options, { 'value': keys });
  }
  return res;
}