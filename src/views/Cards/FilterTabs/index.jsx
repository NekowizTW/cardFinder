import React from 'react';
import { useLocation } from 'react-router-dom';

import { CustomTabs } from '../../../components';

import AdditionalProps from './AdditionalProps';
import ASProps from './ASProps';
import BasicProps from './BasicProps';
import EXASProps from './EXASProps';
import SenzaiProps from './SenzaiProps';
import SSProps from './SSProps';

const TABS = [
  { key: 'basicProps', label: '基本屬性', Slot: <BasicProps /> },
  { key: 'asProps', label: '答題技能', Slot: <ASProps /> },
  { key: 'ssProps', label: '特殊技能', Slot: <SSProps /> },
  { key: 'exasProps', label: 'EXAS', Slot: <EXASProps /> },
  { key: 'senzaiProps', label: '潛能/L發動能力', Slot: <SenzaiProps /> },
];

export default function FilterTabs() {
  const location = useLocation();

  const replaceHistory = React.useCallback(() => {
    window.history.replaceState(undefined, '');
  }, []);

  React.useEffect(() => {
    window.addEventListener('beforeunload', replaceHistory);
    return () => {
      window.removeEventListener('beforeunload', replaceHistory);
    };
  }, [replaceHistory]);

  return (
    <>
      <CustomTabs
        tabs={TABS}
        defaultKey={location.state?.tab ?? TABS[0].key}
      />
      <AdditionalProps />
    </>
  );
}
