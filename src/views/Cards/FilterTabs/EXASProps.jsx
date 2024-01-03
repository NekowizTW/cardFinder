import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setEXASPropsFilter } from '../../../actions/filtersActions';
import {
  EXAS_CONDITIONS, EXAS_TYPES,
} from '../../../model/variables';

export default function ASProps() {
  const dispatch = useDispatch();
  const { uncategorizedOptions } = useSelector((state) => state.cards);
  const { exasCondition, exasType } = useSelector((state) => state.filters);

  const combinedEXASConditionOptions = React.useMemo(() => [
    ...EXAS_CONDITIONS, { label: '未分類', options: uncategorizedOptions.exasCondition },
  ], [uncategorizedOptions]);

  const combinedEXASTypeOptions = React.useMemo(() => [
    ...EXAS_TYPES, { label: '未分類', options: uncategorizedOptions.exasType },
  ], [uncategorizedOptions]);

  const handleChange = (key, newValue) => dispatch(setEXASPropsFilter({
    exasCondition,
    exasType,
    [key]: newValue,
  }));

  return (
    <>
      <Select
        name="form-exasCondition-field"
        className="pure-u-1 pure-u-md-1"
        value={exasCondition}
        options={combinedEXASConditionOptions}
        isMulti
        onChange={(newValue) => handleChange('exasCondition', newValue)}
        placeholder="請選擇EXAS觸發條件"
      />
      <Select
        name="form-exasType-field"
        className="pure-u-1 pure-u-md-1"
        value={exasType}
        options={combinedEXASTypeOptions}
        isMulti
        onChange={(newValue) => handleChange('exasType', newValue)}
        placeholder="請選擇EXAS技能類型"
      />
    </>
  );
}
