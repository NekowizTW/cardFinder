import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setEXASPropsFilter } from '../../../actions/filtersActions';
import {
  EXAS_CONDITIONS, EXAS_TYPES,
} from '../../../model/variables';

export default function EXASProps() {
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
    <React.Fragment>
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1"
        name="form-exasCondition-field"
        onChange={(newValue) => handleChange('exasCondition', newValue)}
        options={combinedEXASConditionOptions}
        placeholder="請選擇EXAS觸發條件"
        value={exasCondition}
      />
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1"
        name="form-exasType-field"
        onChange={(newValue) => handleChange('exasType', newValue)}
        options={combinedEXASTypeOptions}
        placeholder="請選擇EXAS技能類型"
        value={exasType}
      />
    </React.Fragment>
  );
}
