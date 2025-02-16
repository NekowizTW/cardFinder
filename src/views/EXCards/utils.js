import PropTypes from 'prop-types';

import { WIKI_URL } from '../../model/variables';

export const EXFormat = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  smallFilename: PropTypes.string,
  source: PropTypes.string,
});

export const LeaderEXFormat = PropTypes.shape({
  name: PropTypes.string,
  rank: PropTypes.string,
  condition: PropTypes.string,
  skill: PropTypes.string,
  small_filename: PropTypes.string,
});

export const sourceParser = (source = '') => {
  const sourceArr = source.split(/<br\s*\/?>/i);
  const re = /[{[]{2}(.*)[}\]]{2}/gm;
  const m = re.exec(sourceArr[0]);

  if (m === null) { return { text: sourceArr, link: null }; }
  if (m[1].indexOf('取得來源') >= 0) {
    return {
      text: sourceArr.slice(1),
      link: { text: '結晶化', href: `${WIKI_URL}/結晶化` },
    };
  }

  // console.log(`special case: ${JSON.stringify(sourceArr)}, m: ${JSON.stringify(m)}`);
  const split = m[1].indexOf('|');
  return {
    text: [sourceArr[0].replace(m[0], ''), ...sourceArr.slice(1)],
    link: { text: m[1].slice(split + 1), href: `${WIKI_URL}/${m[1].slice(0, split)}` },
  };
};

export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16)}`);
}
