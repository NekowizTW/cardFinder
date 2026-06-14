import React from 'react';

import PropTypes from 'prop-types';

import { SkillBox } from '../../../components';

export default function NormalMode({ asData, ssData, EXASData }) {
  return (
    <div className="pure-u-1">
      <SkillBox
        info={asData.info}
        subTitle={asData.type}
        title={asData.name}
        type="as"
      />
      <SkillBox
        info={ssData.info}
        right={`${ssData.cdf}/${ssData.cds} Turns`}
        subTitle={ssData.type}
        title={ssData.name}
        type="ss"
      />
      {!!EXASData.condition && (
      <SkillBox
        info={EXASData.condition}
        title="【傳奇型態條件】"
        type="exas"
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
