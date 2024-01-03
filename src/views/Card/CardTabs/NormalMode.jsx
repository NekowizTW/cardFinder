import React from 'react';
import PropTypes from 'prop-types';

import { SkillBox } from '../../../components';

export default function NormalMode({ asData, ssData, EXASData }) {
  return (
    <div className="pure-u-1">
      <SkillBox
        type="as"
        title={asData.name}
        subTitle={asData.type}
        info={asData.info}
      />
      <SkillBox
        type="ss"
        title={ssData.name}
        right={`${ssData.cdf}/${ssData.cds} Turns`}
        subTitle={ssData.type}
        info={ssData.info}
      />
      {!!EXASData.condition && (
      <SkillBox
        type="exas"
        title="【傳奇型態條件】"
        info={EXASData.condition}
      />
      )}
    </div>
  );
}

const normalAS = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
});

const normalSS = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  cdf: PropTypes.number,
  cds: PropTypes.number,
});

const exasWithCondition = PropTypes.shape({
  condition: PropTypes.string,
});

NormalMode.propTypes = {
  asData: normalAS,
  ssData: normalSS,
  EXASData: exasWithCondition,
};

NormalMode.defaultProps = {
  asData: { name: '', type: '', info: '' },
  ssData: {
    name: '', type: '', info: '', cdf: 0, cds: 0,
  },
  EXASData: { condition: '' },
};
