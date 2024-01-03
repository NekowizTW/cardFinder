import React from 'react';
import PropTypes from 'prop-types';

import { SkillBox } from '../../../components';

export default function LegendMode({ as2Data, ss2Data, EXASData }) {
  return (
    <div className="pure-u-1">
      <SkillBox
        type="as"
        title={as2Data.name}
        subTitle={as2Data.type}
        info={as2Data.info}
      />
      <SkillBox
        type="ss"
        title={ss2Data.name}
        right={`${ss2Data.cdf}/${ss2Data.cds} Turns`}
        subTitle={ss2Data.type}
        info={ss2Data.info}
      />
      {!!EXASData.type && (
      <SkillBox
        type="exas"
        title=""
        subTitle={EXASData.type}
        info={EXASData.info}
      />
      )}
    </div>
  );
}

const legendAS = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
});

const legendSS = PropTypes.shape({
  name: PropTypes.string,
  type: PropTypes.string,
  info: PropTypes.string,
  cdf: PropTypes.number,
  cds: PropTypes.number,
});

const exasWithTypeInfo = PropTypes.shape({
  type: PropTypes.string,
  info: PropTypes.string,
});

LegendMode.propTypes = {
  as2Data: legendAS,
  ss2Data: legendSS,
  EXASData: exasWithTypeInfo,
};

LegendMode.defaultProps = {
  as2Data: { name: '', type: '', info: '' },
  ss2Data: {
    name: '', type: '', info: '', cdf: 0, cds: 0,
  },
  EXASData: { type: '', info: '' },
};
