import React from 'react';
import PropTypes from 'prop-types';

import { SenzaiRow } from '../../../components';

export default function SenzaiList({ id, senzaiArr, senzaiLArr }) {
  return (
    <SenzaiRow
      belongsTo={id}
      senzaiArr={senzaiArr}
      senzaiLArr={senzaiLArr}
      variant="table"
    />
  );
}

SenzaiList.propTypes = {
  id: PropTypes.string,
  senzaiArr: PropTypes.arrayOf(PropTypes.string),
  senzaiLArr: PropTypes.arrayOf(PropTypes.string),
};

SenzaiList.defaultProps = {
  id: '',
  senzaiArr: [],
  senzaiLArr: [],
};
