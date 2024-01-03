import React from 'react';

import { CustomTabs } from '../../components';

import EXCardsList from './EXCardsList';
import LeaderEXCardsList from './LeaderEXCardsList';

import './styles.scss';

const TABS = [
  { key: 'exCards', label: '精靈用結晶', Slot: <EXCardsList /> },
  { key: 'leaderEXCards', label: '隊伍用精靈大結晶', Slot: <LeaderEXCardsList /> },
];

export default function EXCards() {
  return (
    <CustomTabs tabs={TABS} defaultKey={TABS[0].key} />
  );
}
