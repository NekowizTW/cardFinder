import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAdditionalPropsFilter } from '../../../actions/filtersActions';
import CustomSwitch from '../../../components/CustomSwitch';

export default function AdditionalProps() {
  const dispatch = useDispatch();
  const { isHaifu, isMaxEvo, isSelectedOnly } = useSelector((state) => state.filters);

  const handleChange = (key, newValue) => dispatch(setAdditionalPropsFilter({
    isHaifu,
    isMaxEvo,
    isSelectedOnly,
    [key]: newValue,
  }));

  return (
    <div style={{
      margin: '4px 0 4px', display: 'flex', gap: 12, flexWrap: 'wrap',
    }}
    >
      <CustomSwitch
        label="只顯示最終進化"
        checked={isMaxEvo}
        onChange={(event) => handleChange('isMaxEvo', event.target.checked)}
      />
      <CustomSwitch
        label="只顯示配佈卡"
        checked={isHaifu}
        onChange={(event) => handleChange('isHaifu', event.target.checked)}
      />
      <CustomSwitch
        label="只顯示已選擇的卡片"
        checked={isSelectedOnly}
        onChange={(event) => handleChange('isSelectedOnly', event.target.checked)}
      />
    </div>
  );
}
