import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setSSPropsFilter } from '../../../actions/filtersActions';
import {
  SKILL_SS, SKILL_SS2,
} from '../../../model/variables';

export default function ASProps() {
  const dispatch = useDispatch();
  const { uncategorizedOptions } = useSelector((state) => state.cards);
  const { ss, ss2 } = useSelector((state) => state.filters);

  const combinedSSOptions = React.useMemo(() => [
    ...SKILL_SS, { label: '未分類', options: uncategorizedOptions.ss },
  ], [uncategorizedOptions]);

  const combinedSS2Options = React.useMemo(() => [
    ...SKILL_SS2, { label: '未分類', options: uncategorizedOptions.ss2 },
  ], [uncategorizedOptions]);

  const handleChange = (key, newValue) => dispatch(setSSPropsFilter({
    ss,
    ss2,
    [key]: newValue,
  }));

  return (
    <>
      <Select
        name="form-ss-field"
        className="pure-u-1  pure-u-md-1-2"
        options={combinedSSOptions}
        value={ss}
        isMulti
        onChange={(newValue) => handleChange('ss', newValue)}
        placeholder="請選擇特殊技能"
      />
      <Select
        name="form-ss2-field"
        className="pure-u-1  pure-u-md-1-2"
        options={combinedSS2Options}
        value={ss2}
        isMulti
        onChange={(newValue) => handleChange('ss2', newValue)}
        placeholder="請選擇特殊技能2"
      />
    </>
  );
}
