import React from 'react';
import PropTypes from 'prop-types';

import { linkGenerator, twFilenameFix } from './utils';

export default function WikiImage({ filename, width, height }) {
  const url = linkGenerator(twFilenameFix(filename));

  return (
    <img
      src={url}
      alt={filename}
      style={{ width, height }}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
    />
  );
}

WikiImage.propTypes = {
  filename: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

WikiImage.defaultProps = {
  filename: '0000.png',
  width: 'auto',
  height: 'auto',
};
