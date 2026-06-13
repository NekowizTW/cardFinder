import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setSSPropsFilter } from '../../../actions/filtersActions';
import {
  SKILL_SS2,
  SKILL_SS,
} from '../../../model/variables';

export default function SSProps() {
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
    <React.Fragment>
      <Select
        isMulti
        className="pure-u-1  pure-u-md-1-2"
        name="form-ss-field"
        onChange={(newValue) => handleChange('ss', newValue)}
        options={combinedSSOptions}
        placeholder="請選擇特殊技能"
        value={ss}
      />
      <Select
        isMulti
        className="pure-u-1  pure-u-md-1-2"
        name="form-ss2-field"
        onChange={(newValue) => handleChange('ss2', newValue)}
        options={combinedSS2Options}
        placeholder="請選擇特殊技能2"
        value={ss2}
      />
    </React.Fragment>
  );
}
