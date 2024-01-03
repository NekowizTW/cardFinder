import React from 'react';
import { useSelector } from 'react-redux';

import CertainSenzai from './DisplayHelper/CertainSenzai';
import GlobalSenzai from './DisplayHelper/GlobalSenzai';

export default function Statistics() {
  const {
    globalFlags, certainFlags,
  } = useSelector((state) => state.team);

  return (
    <>
      <h2 className="content-subhead">潛能統計</h2>
      <h3>全域潛能統計</h3>
      <GlobalSenzai globalFlags={globalFlags} />
      <h3>隊員潛能統計</h3>
      <CertainSenzai certainFlags={certainFlags} />
    </>
  );
}
