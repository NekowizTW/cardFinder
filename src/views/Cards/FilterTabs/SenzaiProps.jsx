import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setSenzaiPropsFilter } from '../../../actions/filtersActions';
import {
  SENZAIS,
} from '../../../model/variables';

export default function SenzaiProps() {
  const dispatch = useDispatch();
  const { senzai } = useSelector((state) => state.filters);

  const handleChange = (key, newValue) => dispatch(setSenzaiPropsFilter({
    senzai,
    [key]: newValue,
  }));

  return (
    <Select
      name="form-senzai-field"
      className="pure-u-1 pure-u-md-1"
      value={senzai}
      options={SENZAIS}
      isMulti
      onChange={(newValue) => handleChange('senzai', newValue)}
      placeholder="請選擇潛能/L發動效果(只提供特殊潛能查詢)"
    />
  );
}
