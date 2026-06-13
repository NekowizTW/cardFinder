import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setASPropsFilter } from '../../../actions/filtersActions';
import {
  SKILL_AS2,
  SKILL_AS,
} from '../../../model/variables';

export default function ASProps() {
  const dispatch = useDispatch();
  const { uncategorizedOptions } = useSelector((state) => state.cards);
  const { as, as2 } = useSelector((state) => state.filters);

  const combinedASOptions = React.useMemo(() => [
    ...SKILL_AS, { label: '未分類', options: uncategorizedOptions.as },
  ], [uncategorizedOptions]);

  const combinedAS2Options = React.useMemo(() => [
    ...SKILL_AS2, { label: '未分類', options: uncategorizedOptions.as2 },
  ], [uncategorizedOptions]);

  const handleChange = (key, newValue) => dispatch(setASPropsFilter({
    as,
    as2,
    [key]: newValue,
  }));

  return (
    <React.Fragment>
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1-2"
        name="form-as-field"
        onChange={(newValue) => handleChange('as', newValue)}
        options={combinedASOptions}
        placeholder="請選擇答題技能"
        value={as}
      />
      <Select
        isMulti
        className="pure-u-1 pure-u-md-1-2"
        name="form-as2-field"
        onChange={(newValue) => handleChange('as2', newValue)}
        options={combinedAS2Options}
        placeholder="請選擇答題技能2"
        value={as2}
      />
    </React.Fragment>
  );
}
