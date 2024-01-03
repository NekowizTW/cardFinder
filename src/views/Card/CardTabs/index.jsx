import React from 'react';
import PropTypes from 'prop-types';

import { CustomTabs } from '../../../components';

import EvoGraph from './EvoGraph';
import LegendMode from './LegendMode';
import NormalMode from './NormalMode';
import SenzaiList from './SenzaiList';

export default function CardTabs({ card }) {
  const TABS = [
    {
      key: 'normal',
      label: '一般型態',
      Slot: (
        <NormalMode
          asData={card?.asData}
          ssData={card?.ssData}
          EXASData={card?.EXASData}
        />
      ),
    },
    {
      key: 'legend',
      label: '傳奇型態',
      Slot: (
        <LegendMode
          as2Data={card?.as2Data}
          ss2Data={card?.ss2Data}
          EXASData={card?.EXASData}
        />
      ),
    },
    {
      key: 'senzai',
      label: '潛在能力',
      Slot: (
        <div className="pure-u-1">
          <SenzaiList
            id={card?.id}
            senzaiArr={card?.senzaiArr}
            senzaiLArr={card?.senzaiLArr}
          />
        </div>
      ),
    },
    {
      key: 'evoGraph',
      label: '進化階段',
      Slot: <EvoGraph id={card?.id} />,
    },
  ];

  return (
    <CustomTabs
      tabs={TABS}
      defaultKey={TABS[0].key}
    />
  );
}

CardTabs.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.any,
};

CardTabs.defaultProps = {
  card: {},
};
